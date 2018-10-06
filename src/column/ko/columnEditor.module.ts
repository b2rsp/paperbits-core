import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { ColumnEditor } from "./columnEditor";
import { IWidgetHandler } from "@paperbits/common/editing";
import { ColumnHandlers } from "../columnHandlers";

export class ColumnEditorModule implements IInjectorModule {
    public register(injector: IInjector): void {        
        injector.bind("columnEditor", ColumnEditor);
        injector.bind("columnHandler", ColumnHandlers);

        const widgetHandlers: IWidgetHandler[] = injector.resolve("widgetHandlers");
        widgetHandlers.push(injector.resolve<ColumnHandlers>("columnHandler"));
    }
}