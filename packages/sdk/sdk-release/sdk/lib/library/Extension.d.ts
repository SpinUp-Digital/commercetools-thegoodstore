import { SDK } from "./SDK";
declare abstract class Extension {
    protected sdk: SDK;
    constructor(sdk: SDK);
    abstract unregisterExtension(): void;
}
export { Extension };
