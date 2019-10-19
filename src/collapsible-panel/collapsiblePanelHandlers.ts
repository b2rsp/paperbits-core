﻿import { IWidgetOrder, IWidgetHandler, WidgetContext } from "@paperbits/common/editing";
import { CollapsiblePanelModel } from "./collapsiblePanelModel";
import { IContextCommandSet, IViewManager } from "@paperbits/common/ui";
import { WidgetModel } from "@paperbits/common/widgets";
import { EventManager } from "@paperbits/common/events";


export class CollapsiblePanelHandlers implements IWidgetHandler {
    constructor(
        private readonly viewManager: IViewManager,
        private readonly eventManager: EventManager
    ) { }

    public async getWidgetOrder(): Promise<IWidgetOrder> {
        const widgetOrder: IWidgetOrder = {
            name: "collapsiblePanel",
            displayName: "Collapsible panel",
            iconClass: "paperbits-collapsiblePanel-2",
            createModel: async () => {
                return new CollapsiblePanelModel();
            }
        };

        return widgetOrder;
    }

    public getContextualEditor(context: WidgetContext): IContextCommandSet {
        const gridCellContextualEditor: IContextCommandSet = {
            color: "#9C27B0",
            hoverCommand: null,
            deleteCommand: {
                tooltip: "Delete widget",
                color: "#607d8b",
                callback: () => {
                    context.parentModel.widgets.remove(context.model);
                    context.parentBinding.applyChanges();
                    this.viewManager.clearContextualEditors();
                },
            },
            selectCommands: [{
                tooltip: "Edit collapsible panel",
                iconClass: "paperbits-edit-72",
                position: "top right",
                color: "#607d8b",
                callback: () => this.viewManager.openWidgetEditor(context.binding)
            }]
        };


        if (context.model.widgets.length === 0) {
            gridCellContextualEditor.hoverCommand = {
                color: "#607d8b",
                position: "center",
                tooltip: "Add widget",
                component: {
                    name: "widget-selector",
                    params: {
                        onRequest: () => context.providers,
                        onSelect: (widget: WidgetModel) => {
                            context.model.widgets.push(widget);
                            context.binding.applyChanges();
                            this.eventManager.dispatchEvent("onContentUpdate");
                            this.viewManager.clearContextualEditors();
                        }
                    }
                }
            };
        }

        return gridCellContextualEditor;
    }
}