import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  Check,
  ChevronsUpDown,
  Plus,
  Loader2,
  ChevronLeft,
  ChevronRight,
  X,
  Search,
} from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
// import { toast } from "react-toastify";

import {
  createTechStackService,
  getAllTechStackService,
} from "@/services/misc.services";

const FIELD_CONFIGS = {
  techStack: {
    fetch: getAllTechStackService,
    create: createTechStackService,
    labelKey: "name",
    valueKey: "_id",
    placeholder: "Select tech stack...",
    displayName: "Tech Stack",
  },
};

export const CustomDropdown = ({
  fieldType,
  name,
  value,
  onChange,
  onBlur,
  label,
  placeholder,
  leadingIcon: LeadingIcon,
  error,
  touched,
  helpText,
  containerClass,
  disabled,
  isViewMode = false,
  isAddNew,
  isMulti = false,
  showSelectAll = false,

  options,
  optionLabelKey,
  optionValueKey,
  onCustomCreate,
  isLoading,
  selectedDisplayValue,
}) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [rawData, setRawData] = useState([]);
  const [createdItems, setCreatedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [history, setHistory] = useState([]);
  const searchInputRef = useRef(null);

  // 🔥 Check if direct mode (options provided)
  const isDirectMode = options !== undefined;

  // Get config based on mode
  const config = useMemo(() => {
    if (isDirectMode) {
      // Direct mode config
      return {
        fetch: null,
        create: onCustomCreate || null,
        labelKey: optionLabelKey || "label",
        valueKey: optionValueKey || "value",
        placeholder: placeholder || "Select option...",
        displayName: label || "Option",
      };
    }
    // Config mode - original behavior
    return FIELD_CONFIGS[fieldType] || {};
  }, [
    isDirectMode,
    fieldType,
    optionLabelKey,
    optionValueKey,
    placeholder,
    onCustomCreate,
    label,
  ]);

  const showError = touched && error;
  const isLocked = isViewMode || disabled;
  const fetchDataFromConfig = config.fetch;
  const sourceData = useMemo(() => {
    if (isDirectMode) {
      return [...(options || []), ...createdItems];
    }

    return rawData;
  }, [isDirectMode, options, createdItems, rawData]);
  const isVendorField = !isDirectMode && fieldType === "vendor";
  const visibleSourceData = useMemo(() => {
    if (!isVendorField) return sourceData;

    return sourceData.filter((item) => {
      const rawStatus = String(item?.status ?? "")
        .trim()
        .toUpperCase();
      if (typeof item?.isActive === "boolean") {
        return item.isActive;
      }

      return rawStatus !== "INACTIVE";
    });
  }, [isVendorField, sourceData]);

  // Fetch data for config-driven mode only
  useEffect(() => {
    if (isDirectMode) return;

    const fetchData = async () => {
      if (!fetchDataFromConfig) return;
      setLoading(true);
      try {
        const res = await fetchDataFromConfig();
        setRawData(res?.data?.data || []);
      } catch (err) {
        console.error(`Error fetching ${fieldType}:`, err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchDataFromConfig, fieldType, isDirectMode]);

  useEffect(() => {
    if (!open || isLocked) return;

    const frame = window.requestAnimationFrame(() => {
      searchInputRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [open, isLocked]);

  const activeLevel = useMemo(() => {
    return history.length > 0
      ? history[history.length - 1].children
      : visibleSourceData;
  }, [history, visibleSourceData]);

  const allSelectableValues = useMemo(() => {
    if (!isMulti) return [];

    const flatten = (data) => {
      if (!Array.isArray(data)) return [];

      return data.reduce((acc, item) => {
        acc.push(item);
        if (item.children && Array.isArray(item.children)) {
          acc.push(...flatten(item.children));
        }
        return acc;
      }, []);
    };

    return [
      ...new Set(
        flatten(visibleSourceData)
          .map((item) => String(item?.[config.valueKey] ?? "").trim())
          .filter(Boolean),
      ),
    ];
  }, [config.valueKey, isMulti, visibleSourceData]);

  const selectedValueList = useMemo(() => {
    if (!isMulti) return [];
    return [
      ...new Set(
        (Array.isArray(value) ? value : [])
          .map((item) => String(item ?? "").trim())
          .filter(Boolean),
      ),
    ];
  }, [isMulti, value]);

  const hasSelectedAll =
    isMulti &&
    allSelectableValues.length > 0 &&
    allSelectableValues.every((item) => selectedValueList.includes(item));

  const handleToggleSelectAll = () => {
    if (isLocked || !isMulti || allSelectableValues.length === 0) return;

    onChange(name, hasSelectedAll ? [] : allSelectableValues);
  };

  const handleSelect = (itemId) => {
    if (isLocked) return;

    if (isMulti) {
      let newValue = Array.isArray(value) ? [...value] : [];

      if (newValue.includes(itemId)) {
        newValue = newValue.filter((v) => v !== itemId);
      } else {
        newValue.push(itemId);
      }

      onChange(name, newValue);
      return;
    } else {
      onChange(name, itemId);
      setOpen(false);
      setHistory([]);
      setSearchValue("");
    }
  };

  const handleClear = (e) => {
    if (isLocked) return;

    e.preventDefault();
    e.stopPropagation();
    onChange(name, isMulti ? [] : "");
    setHistory([]);
    setSearchValue("");
  };

  const handleCreate = async () => {
    if (!searchValue || !config.create || isLocked) return;

    setIsCreating(true);
    try {
      let newItem;

      if (isDirectMode && onCustomCreate) {
        // Direct mode: call custom create handler
        newItem = await onCustomCreate(searchValue);
      } else if (config.create) {
        // Config mode: use API create
        const payload = { [config.labelKey]: searchValue };
        const res = await config.create(payload);
        newItem = res?.data?.data;
      }

      if (newItem) {
        if (isDirectMode) {
          setCreatedItems((prev) => [...prev, newItem]);
        } else {
          setRawData((prev) => [...prev, newItem]);
        }

        handleSelect(newItem[config.valueKey]);
        setSearchValue("");
      }
    } catch (error) {
      console.error(`Error creating ${fieldType || "option"}:`, error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        `Failed to create ${fieldType || "option"}`;
      // toast.error(message);
    } finally {
      setIsCreating(false);
    }
  };

  const getSelectedLabel = () => {
    const isLoadingState = isDirectMode ? isLoading : loading;
    if (isLoadingState) return "Loading...";

    if (!value || (isMulti && value.length === 0)) {
      return placeholder || config.placeholder;
    }

    // Helper to find path in nested structure
    const findPath = (data, targetId, path = []) => {
      for (const item of data) {
        const newPath = [...path, item];

        if (String(item[config.valueKey]) === String(targetId)) {
          return newPath;
        }

        if (item.children && Array.isArray(item.children)) {
          const found = findPath(item.children, targetId, newPath);
          if (found) return found;
        }
      }
      return null;
    };

    // Multi-select case
    if (isMulti) {
      const labels = [];

      value.forEach((val) => {
        const path = findPath(sourceData, val);
        if (!path) return;

        const selected = path[path.length - 1];
        const parent = path.length > 1 ? path[path.length - 2] : null;

        if (parent) {
          labels.push(
            `${selected[config.labelKey]} in ${parent[config.labelKey]}`,
          );
        } else {
          labels.push(selected[config.labelKey]);
        }
      });

      if (labels.length > 2) {
        return `${labels.length} selected`;
      }

      return labels.join(", ");
    }

    // Single select case
    const path = findPath(sourceData, value);
    if (!path) return config.placeholder;

    const selected = path[path.length - 1];
    const parent = path.length > 1 ? path[path.length - 2] : null;

    if (!parent) return selected[config.labelKey];

    return {
      parent: parent[config.labelKey],
      child: selected[config.labelKey],
    };
  };

  const displayItems = useMemo(() => {
    if (!searchValue) return activeLevel;

    const flatten = (data) => {
      if (!Array.isArray(data)) return [];
      return data.reduce((acc, item) => {
        acc.push(item);
        if (item.children && Array.isArray(item.children)) {
          acc.push(...flatten(item.children));
        }
        return acc;
      }, []);
    };

    const flattened = flatten(visibleSourceData);
    return flattened
      .filter((item) =>
        String(item[config.labelKey] || "")
          .toLowerCase()
          .includes(searchValue.toLowerCase()),
      )
      .slice(0, 50);
  }, [activeLevel, searchValue, visibleSourceData, config.labelKey]);

  const currentLoading = isDirectMode ? isLoading : loading;

  return (
    <Field className={cn("space-y-1.5 w-full", containerClass)}>
      {label && (
        <FieldLabel className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          {label}
        </FieldLabel>
      )}

      <div
        className={cn(
          "flex items-center overflow-hidden rounded-[18px] border bg-background/80 shadow-sm transition-all",
          showError
            ? "border-red-500/60 bg-red-500/5"
            : "border-border/60 focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/10",
          isLocked && "cursor-default opacity-90",
        )}
      >
        <Popover
          open={isLocked ? false : open}
          onOpenChange={(val) => {
            if (isLocked) return;
            setOpen(val);
            if (!val) {
              setHistory([]);
              setSearchValue("");
            }
          }}
        >
          <PopoverTrigger
            type="button"
            role="combobox"
            onBlur={onBlur}
            disabled={isLocked}
            className={cn(
              "flex h-11 w-full items-center justify-between border-none bg-transparent px-4 py-3 text-sm shadow-none outline-none hover:bg-transparent focus:ring-0 focus:ring-offset-0",
              isLocked && "pointer-events-none cursor-default opacity-70",
            )}
          >
            <div className="flex items-center flex-1 min-w-0 gap-3">
              {LeadingIcon && (
                <span className="flex items-center justify-center rounded-full size-8 shrink-0 bg-secondary/70 text-muted-foreground">
                  <LeadingIcon className="size-4" />
                </span>
              )}

              <span
                className={cn(
                  "min-w-0 truncate",
                  !value && "text-muted-foreground/70",
                )}
              >
                {(() => {
                  const explicitLabel = String(
                    selectedDisplayValue ?? "",
                  ).trim();
                  const labelValue = explicitLabel || getSelectedLabel();

                  if (typeof labelValue === "string") {
                    return <span className="truncate">{labelValue}</span>;
                  }

                  return (
                    <span className="truncate">
                      <span className="text-muted-foreground/70">
                        {labelValue.child} in {labelValue.parent}
                      </span>
                    </span>
                  );
                })()}
              </span>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {value &&
                (!isMulti ? value : value?.length > 0) &&
                !isLocked &&
                !currentLoading && (
                  <div
                    role="button"
                    onClick={handleClear}
                    className="p-1 mr-1 rounded-full hover:bg-secondary/70"
                  >
                    <X className="h-3.5 w-3.5 text-muted-foreground/70 hover:text-foreground" />
                  </div>
                )}
              {!isLocked && <ChevronsUpDown className="w-4 h-4 opacity-50" />}
            </div>
          </PopoverTrigger>

          <PopoverContent className="w-[var(--radix-popover-trigger-width)] overflow-hidden rounded-[18px] border border-border/60 bg-popover/95 p-0 shadow-[0_24px_70px_rgba(15,23,42,0.16)] backdrop-blur-xl">
            <div className="p-2 border-b border-border/60 bg-popover/95 backdrop-blur-xl">
              <div className="flex items-center gap-2 rounded-[14px] border border-border/60 bg-background/80 px-3">
                <Search className="size-4 shrink-0 text-muted-foreground" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => e.stopPropagation()}
                  onKeyUp={(e) => e.stopPropagation()}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                  placeholder={`Search ${config.displayName}...`}
                  readOnly={isLocked}
                  className="w-full text-sm bg-transparent outline-none h-9 placeholder:text-muted-foreground/60"
                />
              </div>
            </div>

            {isMulti &&
              showSelectAll &&
              !currentLoading &&
              allSelectableValues.length > 0 && (
                <div className="p-2 border-b border-border/60 bg-popover/95">
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full justify-start gap-2 rounded-[14px] text-primary hover:bg-primary/10"
                    onClick={handleToggleSelectAll}
                  >
                    <Check className="w-4 h-4" />
                    {hasSelectedAll
                      ? "Clear all"
                      : `Select all (${allSelectableValues.length})`}
                  </Button>
                </div>
              )}

            <div className="overflow-y-auto max-h-72">
              {/* Add New option */}
              {isAddNew &&
                config.create &&
                searchValue &&
                displayItems.length === 0 && (
                  <div className="p-2 border-b border-border/60">
                    <Button
                      type="button"
                      variant="secondary"
                      className="w-full justify-start gap-2 rounded-[14px] text-primary hover:bg-primary/10"
                      onClick={handleCreate}
                      disabled={isCreating}
                    >
                      {isCreating ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                      Add new "{searchValue}"
                    </Button>
                  </div>
                )}

              {/* Back button for nested navigation */}
              {!searchValue && history.length > 0 && (
                <div className="px-3 py-2 border-b border-border/60 bg-muted/20">
                  <div
                    className="flex items-center gap-2 text-sm cursor-pointer text-muted-foreground hover:text-foreground"
                    onClick={(e) => {
                      if (isLocked) return;
                      e.stopPropagation();
                      setHistory((prev) => prev.slice(0, -1));
                    }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>
                      {history.length > 1
                        ? history[history.length - 2][config.labelKey]
                        : "All"}
                    </span>
                  </div>

                  <div className="mt-1 text-sm font-semibold text-foreground">
                    {history[history.length - 1][config.labelKey]}
                  </div>
                </div>
              )}

              {/* Loading state */}
              {currentLoading && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                </div>
              )}

              {/* Items list */}
              {!currentLoading &&
                displayItems.map((item) => {
                  const isSelected = isMulti
                    ? value?.includes(item[config.valueKey])
                    : String(value) === String(item[config.valueKey]);

                  const hasChildren = !searchValue && item.children?.length > 0;

                  return (
                    <div
                      key={item[config.valueKey]}
                      onClick={() => handleSelect(item[config.valueKey])}
                      className={cn(
                        "group relative flex w-full cursor-pointer select-none items-center rounded-[14px] py-2 pl-9 pr-3 text-sm outline-none transition-colors",
                        "hover:bg-secondary hover:text-foreground focus:bg-secondary focus:text-foreground",
                        !isLocked && "cursor-pointer",
                      )}
                    >
                      <div className="flex items-center flex-1 min-w-0 gap-2">
                        <span className="absolute left-3 flex h-3.5 w-3.5 items-center justify-center">
                          {isSelected && (
                            <Check className="w-4 h-4 text-primary" />
                          )}
                        </span>
                        <span className="min-w-0 truncate">
                          {item[config.labelKey]}
                        </span>
                      </div>

                      {hasChildren && (
                        <ChevronRight
                          className="w-4 h-4 cursor-pointer shrink-0 text-muted-foreground"
                          onClick={(e) => {
                            if (isLocked) return;
                            e.stopPropagation();
                            setHistory((prev) => [...prev, item]);
                          }}
                        />
                      )}
                    </div>
                  );
                })}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {showError && <p className="text-xs text-red-600">⚠ {error}</p>}
      {!showError && helpText && (
        <p className="text-xs text-muted-foreground">{helpText}</p>
      )}
    </Field>
  );
};
