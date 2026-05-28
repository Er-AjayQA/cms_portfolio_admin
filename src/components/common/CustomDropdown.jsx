import React, { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronsUpDown, Loader2, Plus, Search, X } from "lucide-react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  createTechStackService,
  getAllTechStackService,
} from "@/services/misc.services";

const FIELD_CONFIGS = {
  techStack: {
    fetch: getAllTechStackService,
    create: createTechStackService,
    createKey: "name",
    labelKey: "name",
    valueKey: "_id",
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
  searchPlaceholder,
  error,
  touched,
  helpText,
  containerClass,
  disabled,
  LeadingIcon,
  isViewMode = false,
  isAddNew = false,
  isMulti = false,
}) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const searchInputRef = useRef(null);

  const config = FIELD_CONFIGS[fieldType] || {};
  const showError = touched && error;
  const isLocked = isViewMode || disabled;

  // Fetch Dropdown Items
  useEffect(() => {
    const fetchData = async () => {
      if (!config.fetch) return;

      setLoading(true);
      try {
        const res = await config.fetch();
        setItems(res?.data || []);
      } catch (fetchError) {
        console.error(`Error fetching ${fieldType}:`, fetchError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [config.fetch, fieldType]);

  useEffect(() => {
    if (!open || isLocked) return;

    const frame = window.requestAnimationFrame(() => {
      searchInputRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [open, isLocked]);

  const selectedValues = useMemo(() => {
    if (!isMulti) return [];

    return [...new Set((Array.isArray(value) ? value : []).filter(Boolean))];
  }, [isMulti, value]);

  const filteredItems = useMemo(() => {
    if (!searchValue) return items;

    return items.filter((item) =>
      String(item?.[config.labelKey] || "")
        .toLowerCase()
        .includes(searchValue.toLowerCase()),
    );
  }, [config.labelKey, items, searchValue]);

  const handleSelect = (itemId) => {
    if (isLocked) return;

    if (isMulti) {
      const currentValues = Array.isArray(value) ? [...value] : [];
      const nextValues = currentValues.includes(itemId)
        ? currentValues.filter((currentValue) => currentValue !== itemId)
        : [...currentValues, itemId];

      onChange(name, nextValues);
      return;
    }

    onChange(name, itemId);
    setOpen(false);
    setSearchValue("");
  };

  const handleClear = (event) => {
    if (isLocked) return;

    event.preventDefault();
    event.stopPropagation();
    onChange(name, isMulti ? [] : "");
    setSearchValue("");
  };

  const handleCreate = async () => {
    if (!searchValue || !config.create || isLocked) return;

    setIsCreating(true);
    try {
      const payload = { [config.createKey || config.labelKey]: searchValue };
      const res = await config.create(payload);
      const newItem = res?.data || res?.techStack;

      if (!newItem) return;

      setItems((prev) => {
        const alreadyExists = prev.some(
          (item) =>
            String(item?.[config.valueKey]) ===
            String(newItem?.[config.valueKey]),
        );

        return alreadyExists ? prev : [...prev, newItem];
      });
      handleSelect(newItem[config.valueKey]);
      setSearchValue("");
    } catch (createError) {
      console.error(`Error creating ${fieldType}:`, createError);
    } finally {
      setIsCreating(false);
    }
  };

  const getSelectedLabel = () => {
    if (loading) return "Loading...";

    if (!value || (isMulti && selectedValues.length === 0)) {
      return placeholder;
    }

    if (isMulti) {
      const labels = selectedValues
        .map((selectedValue) =>
          items.find(
            (item) => String(item?.[config.valueKey]) === String(selectedValue),
          ),
        )
        .filter(Boolean)
        .map((item) => item[config.labelKey]);

      if (labels.length > 2) return `${labels.length} selected`;
      return labels.join(", ");
    }

    const selectedItem = items.find(
      (item) => String(item?.[config.valueKey]) === String(value),
    );

    return selectedItem?.[config.labelKey] || config.placeholder;
  };

  const hasValue = isMulti ? selectedValues.length > 0 : Boolean(value);

  return (
    <Field className={cn("w-full space-y-1.5", containerClass)}>
      {label && <FieldLabel>{label}</FieldLabel>}

      <div
        className={cn(
          "flex items-center !m-0 overflow-hidden rounded-lg border border-border/60 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-all focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/10",
          open && "border-primary/40 ring-2 ring-primary/10",
          showError && "border-red-500/60 ring-2 ring-red-500/10",
          isLocked && "cursor-default opacity-90",
        )}
      >
        <Popover
          open={isLocked ? false : open}
          onOpenChange={(nextOpen) => {
            if (isLocked) return;
            setOpen(nextOpen);
            if (!nextOpen) {
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
              "flex h-11 w-full items-center justify-between border-none bg-transparent px-4 py-3 text-sm shadow-none outline-none hover:bg-transparent focus-visible:outline-none",
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
                  !hasValue && "text-muted-foreground/70",
                )}
              >
                <span className="truncate">{getSelectedLabel()}</span>
              </span>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {hasValue && !isLocked && !loading && (
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

          <PopoverContent className="w-[var(--radix-popover-trigger-width)] overflow-hidden rounded-lg border border-border/60 bg-white p-0 shadow-[0_24px_70px_rgba(15,23,42,0.16)]">
            <div className="p-2 bg-white border-b border-border/60">
              <div className="flex items-center gap-2 rounded-[14px] border border-border/60 bg-white px-3 shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
                <Search className="size-4 shrink-0 text-muted-foreground" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  onKeyDown={(event) => event.stopPropagation()}
                  onKeyUp={(event) => event.stopPropagation()}
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={(event) => event.stopPropagation()}
                  placeholder={searchPlaceholder}
                  readOnly={isLocked}
                  className="w-full text-sm bg-transparent outline-none h-9 placeholder:text-muted-foreground/60"
                />
              </div>
            </div>

            <div className="p-1 overflow-y-auto bg-white max-h-72">
              {isAddNew &&
                config.create &&
                searchValue &&
                filteredItems.length === 0 && (
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

              {loading && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                </div>
              )}

              {!loading &&
                filteredItems.map((item) => {
                  const itemValue = item[config.valueKey];
                  const isSelected = isMulti
                    ? selectedValues.includes(itemValue)
                    : String(value) === String(itemValue);

                  return (
                    <div
                      key={itemValue}
                      onClick={() => handleSelect(itemValue)}
                      className="relative flex items-center w-full py-2 text-sm transition-colors rounded-md outline-none cursor-pointer select-none group px-9 hover:bg-black/10 hover:text-foreground focus:bg-accent focus:text-accent-foreground"
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
                    </div>
                  );
                })}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {showError && <p className="text-xs text-red-600">{error}</p>}
      {!showError && helpText && (
        <p className="text-xs text-muted-foreground">{helpText}</p>
      )}
    </Field>
  );
};
