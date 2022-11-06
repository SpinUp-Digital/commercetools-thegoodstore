import Event from "./Event";
export default class SimpleEmitter<Events> {
    protected eventHandlers: Record<string, Array<(event: Event<keyof Events, Events[keyof Events]>) => void>>;
    constructor();
    protected getEventHandlers<EventName extends keyof Events>(eventName: EventName): Array<(event: Event<EventName, Events[EventName]>) => void>;
    addHandler<EventName extends keyof Events>(eventName: EventName, handler: (event: Event<EventName, Events[EventName]>) => void): void;
    removeHandlersForEvent<EventName extends keyof Events>(eventName: EventName): void;
    removeHandler<EventName extends keyof Events>(eventName: EventName, handler: (event: Event<EventName, Events[EventName]>) => void): void;
    removeAllHandlers(): void;
    triggerHandlers<EventName extends keyof Events>(event: Event<EventName, Events[EventName]>): void;
}
