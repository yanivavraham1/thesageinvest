"use client";
import { useState, useRef, ChangeEvent } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, ChevronUp, ChevronDown, Upload } from "lucide-react";
// Type definitions
interface ComponentField {
  name: string;
  label: string;
  type: string;
  input: string;
}

interface ComponentProp {
  name: string;
  label: string;
  type: string;
  input: string;
  options?: string[];
  fields?: ComponentField[];
}

interface ComponentDefinition {
  component: string;
  props: ComponentProp[];
}

// Types for form data and state

type DynamicArrayValue = { [key: string]: Record<string, string> };
type FormDataState = Record<string, string | number | DynamicArrayValue>;
type MdxComponentList = string[];
type MetadataState = Record<string, string>;

type Direction = "up" | "down";

const components: ComponentDefinition[] = [
  {
    component: "PostImage",
    props: [
      {
        name: "src",
        label: "Image Source",
        type: "string",
        input: "input",
      },
      {
        name: "alt",
        label: "Alt Text",
        type: "string",
        input: "textarea",
      },
      {
        name: "width",
        label: "Image Width",
        type: "number",
        input: "input",
      },
      {
        name: "height",
        label: "Image Height",
        type: "number",
        input: "input",
      },
    ],
  },
  {
    component: "SubHeading",
    props: [
      {
        name: "text",
        label: "Sub Heading Text",
        type: "string",
        input: "input",
      },
    ],
  },
  {
    component: "Paragraph",
    props: [
      {
        name: "text",
        label: "Paragraph Text",
        type: "string",
        input: "textarea",
      },
    ],
  },

  {
    component: "Heading",
    props: [
      {
        name: "text",
        label: "Heading Text",
        type: "string",
        input: "input",
      },
    ],
  },
  {
    component: "ExpandList",
    props: [
      {
        name: "listArray",
        label: "List Items",
        type: "array",
        input: "dynamic",
        fields: [
          { name: "main", label: "Main Text", type: "string", input: "input" },
          {
            name: "paragraph",
            label: "Paragraph",
            type: "string",
            input: "textarea",
          },
        ],
      },
      {
        name: "caption",
        label: "Caption",
        type: "string",
        input: "input",
      },
      {
        name: "className",
        label: "CSS Classes",
        type: "string",
        input: "input",
      },
    ],
  },
  {
    component: "List",
    props: [
      {
        name: "listArray",
        label: "List Items",
        type: "array",
        input: "dynamic",
        fields: [
          { name: "item", label: "Item", type: "string", input: "input" },
        ],
      },
      {
        name: "caption",
        label: "Caption",
        type: "string",
        input: "input",
      },
      {
        name: "decoration",
        label: "Decoration Style",
        type: "string",
        input: "select",
        options: ["dots", "numbers", "none", "checkmarks", "arrows", "trends"],
      },
      {
        name: "className",
        label: "CSS Classes",
        type: "string",
        input: "input",
      },
    ],
  },
  {
    component: "FaqList",
    props: [
      {
        name: "listFaq",
        label: "FAQ Items",
        type: "array",
        input: "dynamic",
        fields: [
          {
            name: "question",
            label: "Question",
            type: "string",
            input: "input",
          },
          {
            name: "answer",
            label: "Answer",
            type: "string",
            input: "textarea",
          },
        ],
      },
      {
        name: "title",
        label: "Title",
        type: "string",
        input: "input",
      },
    ],
  },
];

export default function MdxForm() {
  const [selectedComponent, setSelectedComponent] = useState<string>("");
  const [formData, setFormData] = useState<FormDataState>({});
  const [mdxComponents, setMdxComponents] = useState<MdxComponentList>([]);
  const [loadedMetadata, setLoadedMetadata] = useState<MetadataState>({});
  const [parseError, setParseError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleComponentSelect = (componentName: string) => {
    setSelectedComponent(componentName);
    setFormData({});
  };

  const handleInputChange = (propName: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [propName]: value,
    }));
  };

  const handleArrayChange = (
    propName: string,
    index: string | number,
    fieldName: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [propName]: {
        ...(prev[propName] as DynamicArrayValue),
        [index]: {
          ...((prev[propName] as DynamicArrayValue)?.[index] || {}),
          [fieldName]: value,
        },
      },
    }));
  };

  const addArrayItem = (propName: string) => {
    const currentArray = (formData[propName] as DynamicArrayValue) || {};
    const nextIndex = Object.keys(currentArray).length;
    setFormData((prev) => ({
      ...prev,
      [propName]: {
        ...(prev[propName] as DynamicArrayValue),
        [nextIndex]: {},
      },
    }));
  };

  const removeArrayItem = (propName: string, index: string | number) => {
    setFormData((prev) => {
      const newArray: { [key: string]: Record<string, string> } = {
        ...(prev[propName] as DynamicArrayValue),
      };
      delete newArray[index];
      // Reindex the array
      const reindexed: { [key: string]: Record<string, string> } = {};
      Object.values(newArray).forEach((item, i) => {
        reindexed[i] = item;
      });
      return {
        ...prev,
        [propName]: reindexed,
      };
    });
  };

  const parseMdxFile = (content: string) => {
    try {
      setParseError("");

      // Extract frontmatter
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      const metadata: MetadataState = {};

      if (frontmatterMatch) {
        const frontmatterContent = frontmatterMatch[1];
        const lines = frontmatterContent.split("\n");
        lines.forEach((line) => {
          const match = line.match(/^(\w+):\s*"?([^"]*)"?$/);
          if (match) {
            metadata[match[1]] = match[2];
          }
        });
      }

      // Remove frontmatter and imports from content
      let bodyContent = content.replace(/^---\n[\s\S]*?\n---\n*/, "");
      bodyContent = bodyContent.replace(/^import\s+.*?from\s+.*?;\n*/gm, "");

      // Parse components
      const componentRegex = /<(\w+)([^>]*)\/>/g;
      const parsedComponents: string[] = [];
      let match: RegExpExecArray | null;

      while ((match = componentRegex.exec(bodyContent)) !== null) {
        const componentName = match[1];
        const propsString = match[2]?.trim() ?? "";

        // Check if this component is supported
        const componentDef = components.find(
          (c) => c.component === componentName
        );
        if (!componentDef) {
          console.warn(`Unsupported component: ${componentName}`);
          continue;
        }

        // Parse props
        const props: Record<string, unknown> = {};
        if (propsString) {
          // Match prop="value" or prop={value} patterns
          const propRegex = /(\w+)=(:?"([^"]*)"|{([^}]*)})/g;
          let propMatch;

          while ((propMatch = propRegex.exec(propsString)) !== null) {
            const propName = propMatch[1];
            const propValue = propMatch[2] || propMatch[3];

            try {
              // Try to parse as JSON for arrays and objects
              if (propValue.startsWith("[") || propValue.startsWith("{")) {
                props[propName] = JSON.parse(propValue);
              } else if (propValue.startsWith('"') && propValue.endsWith('"')) {
                props[propName] = propValue.slice(1, -1);
              } else {
                props[propName] = propValue;
              }
            } catch (e) {
              props[propName] = propValue;
              console.log(e);
            }
          }
        }

        // Convert back to MDX string format
        const propsEntries = Object.entries(props)
          .map(([key, value]) => {
            if (Array.isArray(value)) {
              return `${key}={${JSON.stringify(value)}}`;
            }
            if (typeof value === "string" && value.includes(" ")) {
              return `${key}="${value}"`;
            }
            return `${key}={${
              typeof value === "string" ? `"${value}"` : value
            }}`;
          })
          .join(" ");

        const mdxString = `<${componentName}${
          propsEntries ? ` ${propsEntries}` : ""
        } />`;
        parsedComponents.push(mdxString);
      }

      setLoadedMetadata(metadata);
      setMdxComponents(parsedComponents);

      if (parsedComponents.length === 0) {
        setParseError(
          "No supported components found in the MDX file. Make sure the file contains components like PostImage, Heading, List, ExpandList, or FaqList."
        );
      }
    } catch (error) {
      setParseError(
        `Error parsing MDX file: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      console.error("Parse error:", error);
    }
  };

  const handleFileLoad = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".mdx") && !file.name.endsWith(".md")) {
      setParseError("Please select an MDX or MD file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content === "string") {
        parseMdxFile(content);
      }
    };
    reader.readAsText(file);

    // Reset file input
    if (event.target) {
      event.target.value = "";
    }
  };

  const addComponent = () => {
    const component = components.find((c) => c.component === selectedComponent);
    if (!component) return;

    const props = Object.entries(formData)
      .filter(([, value]) => value !== "" && value !== undefined)
      .map(([key, value]) => {
        const propDef = component.props.find((p) => p.name === key);

        // Handle array props
        if (propDef?.type === "array") {
          const arrayItems = Object.values(value || {});
          if (arrayItems.length === 0) return null;

          // For List component, convert to simple array
          if (key === "listArray" && selectedComponent === "List") {
            const simpleArray = arrayItems
              .map((item) => item.item)
              .filter(Boolean);
            return `${key}={${JSON.stringify(simpleArray)}}`;
          }

          // For other arrays, keep as object array
          const validItems = arrayItems.filter((item) =>
            Object.values(item).some((val) => val !== "" && val !== undefined)
          );
          return validItems.length > 0
            ? `${key}={${JSON.stringify(validItems)}}`
            : null;
        }

        if (typeof value === "string" && value.includes(" ")) {
          return `${key}="${value}"`;
        }
        return `${key}={${typeof value === "string" ? `"${value}"` : value}}`;
      })
      .filter(Boolean)
      .join(" ");

    const mdxString = `<${selectedComponent}${props ? ` ${props}` : ""} />`;

    setMdxComponents((prev) => [...prev, mdxString]);
    setFormData({});
    setSelectedComponent("");
  };

  const removeComponent = (index: number) => {
    setMdxComponents((prev) => prev.filter((__, i) => i !== index));
  };

  const moveComponent = (index: number, direction: Direction) => {
    setMdxComponents((prev) => {
      const newComponents = [...prev];
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= newComponents.length) return prev;

      [newComponents[index], newComponents[targetIndex]] = [
        newComponents[targetIndex],
        newComponents[index],
      ];
      return newComponents;
    });
  };

  const clearAll = () => {
    setMdxComponents([]);
    setLoadedMetadata({});
    setParseError("");
  };

  const generateFullMDX = () => {
    const imports = [
      ...new Set(
        mdxComponents.map((comp) => {
          const componentName = comp.match(/<(\w+)/)?.[1];
          return componentName;
        })
      ),
    ]
      .map((name) => `import ${name} from '@/components/${name}';`)
      .join("\n");

    // Use loaded metadata if available, otherwise use defaults
    const metadata = {
      title: loadedMetadata.title || "Generated MDX File",
      description: loadedMetadata.description || "Auto-generated MDX content",
      date: loadedMetadata.date || new Date().toISOString().split("T")[0],
      ...loadedMetadata,
    };

    const frontmatter = `---
${Object.entries(metadata)
  .map(([key, value]) => `${key}: "${value}"`)
  .join("\n")}
---

`;

    const content = mdxComponents.join("\n\n");

    return `${frontmatter}${imports ? imports + "\n\n" : ""}${content}`;
  };

  const renderInput = (prop: ComponentProp) => {
    // Only allow string or number for value
    let value: string | number = "";
    if (
      typeof formData[prop.name] === "string" ||
      typeof formData[prop.name] === "number"
    ) {
      value = formData[prop.name] as string | number;
    }

    switch (prop.input) {
      case "textarea":
        return (
          <textarea
            id={prop.name}
            value={value}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              handleInputChange(prop.name, e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder={`Enter ${prop.label.toLowerCase()}`}
          />
        );
      case "select":
        return (
          <select
            id={prop.name}
            value={value}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              handleInputChange(prop.name, e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select an option</option>
            {prop.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "dynamic":
        return renderDynamicArray(prop);
      case "input":
        return (
          <input
            id={prop.name}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange(prop.name, e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type={prop.type === "number" ? "number" : "text"}
            placeholder={`Enter ${prop.label.toLowerCase()}`}
          />
        );
      default:
        return (
          <input
            id={prop.name}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange(prop.name, e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            placeholder={`Enter ${prop.label.toLowerCase()}`}
          />
        );
    }
  };

  const renderDynamicArray = (prop: ComponentProp) => {
    const arrayData: DynamicArrayValue =
      (formData[prop.name] as DynamicArrayValue) || {};
    const items = Object.entries(arrayData);

    return (
      <div className="space-y-3">
        {items.map(([index, itemObj]) => {
          const item: Record<string, string> = itemObj;
          return (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50"
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-sm text-gray-700">
                  Item {parseInt(index) + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => removeArrayItem(prop.name, index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-3">
                {prop.fields?.map((field) => (
                  <div key={field.name}>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      {field.label}
                    </label>
                    {field.input === "textarea" ? (
                      <textarea
                        value={item[field.name] || ""}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                          handleArrayChange(
                            prop.name,
                            index,
                            field.name,
                            e.target.value
                          )
                        }
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        rows={2}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                      />
                    ) : (
                      <input
                        type={field.type === "number" ? "number" : "text"}
                        value={item[field.name] || ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleArrayChange(
                            prop.name,
                            index,
                            field.name,
                            e.target.value
                          )
                        }
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        <button
          type="button"
          onClick={() => addArrayItem(prop.name)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
        >
          <Plus className="h-4 w-4" />
          Add {prop.label.slice(0, -1)} Item
        </button>
      </div>
    );
  };

  const selectedComponentData = components.find(
    (c) => c.component === selectedComponent
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          MDX Component Generator
        </h1>
        <p className="text-gray-600">
          Select a component and configure its properties to generate MDX code,
          or load an existing MDX file to edit.
        </p>
      </div>

      {/* File Load Section */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-blue-900 mb-1">
              Load Existing MDX File
            </h3>
            <p className="text-sm text-blue-700">
              Upload an MDX file to continue editing existing content
            </p>
          </div>
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".mdx,.md"
              onChange={handleFileLoad}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <Upload className="h-4 w-4" />
              Load MDX File
            </button>
          </div>
        </div>

        {parseError && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-800">{parseError}</p>
          </div>
        )}

        {Object.keys(loadedMetadata).length > 0 && (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-green-800 font-medium mb-2">
              ✓ MDX file loaded successfully
            </p>
            <div className="text-xs text-green-700">
              <strong>Metadata:</strong>{" "}
              {Object.entries(loadedMetadata)
                .map(([key, value]) => `${key}: ${value}`)
                .join(", ")}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Component
            </label>
            <Select
              onValueChange={handleComponentSelect}
              value={selectedComponent}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a component" />
              </SelectTrigger>
              <SelectContent>
                {components.map((component, index) => (
                  <SelectItem
                    key={component.component + index}
                    value={component.component}
                  >
                    {component.component}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedComponentData && (
            <div className="bg-gray-50 p-6 rounded-lg max-h-96 overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Configure {selectedComponent}
              </h3>
              <div className="space-y-4">
                {selectedComponentData.props.map((prop) => (
                  <div key={prop.name}>
                    <label
                      htmlFor={prop.name}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {prop.label}
                      <span className="text-gray-500 text-xs ml-1">
                        ({prop.type})
                      </span>
                    </label>
                    {renderInput(prop)}
                  </div>
                ))}
              </div>

              <button
                onClick={addComponent}
                className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Add Component
              </button>
            </div>
          )}
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          {mdxComponents.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  MDX Components ({mdxComponents.length})
                </h3>
                <button
                  onClick={clearAll}
                  className="text-sm text-red-600 hover:text-red-800 focus:outline-none"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {mdxComponents.map((component, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                  >
                    <code className="text-sm text-gray-700 flex-1 mr-2 break-all">
                      {component}
                    </code>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveComponent(index, "up")}
                        disabled={index === 0}
                        className="text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ChevronUp className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => moveComponent(index, "down")}
                        disabled={index === mdxComponents.length - 1}
                        className="text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => removeComponent(index)}
                        className="text-red-500 hover:text-red-700 text-sm ml-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {mdxComponents.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Complete MDX File
              </h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto max-h-96 overflow-y-auto">
                <pre>{generateFullMDX()}</pre>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(generateFullMDX())
                  }
                  className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
                >
                  Copy Full MDX
                </button>
                <button
                  onClick={() => {
                    const blob = new Blob([generateFullMDX()], {
                      type: "text/plain",
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "generated-content.mdx";
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="text-sm text-green-600 hover:text-green-800 focus:outline-none"
                >
                  Download MDX File
                </button>
              </div>
            </div>
          )}

          {selectedComponentData && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Component Properties
              </h3>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Property
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Input
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedComponentData.props.map((prop) => (
                      <tr key={prop.name}>
                        <td className="px-4 py-2 text-sm font-medium text-gray-900">
                          {prop.name}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-500">
                          {prop.type}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-500">
                          {prop.input === "dynamic"
                            ? "Dynamic Form"
                            : prop.input}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {!selectedComponent && mdxComponents.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-4">📝</div>
              <p>
                Select a component to get started or load an existing MDX file
              </p>
            </div>
          )}

          {!selectedComponent && mdxComponents.length > 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>Select another component to add more to your MDX file</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
