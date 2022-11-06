import Event from "./Event";
import SimpleEmitter from "./SimpleEmitter";
export default class EnhancedEmitter<Events extends {}, Hooks extends {}, EventsAndHooks extends Events & Hooks = Events & Hooks> {
    protected eventHandle: SimpleEmitter<EventsAndHooks>;
    protected beforeHandle: SimpleEmitter<Hooks>;
    protected afterHandle: SimpleEmitter<Hooks>;
    constructor();
    trigger<EventName extends keyof EventsAndHooks>(eventOptions: {
        eventName: EventName;
        data: EventsAndHooks[EventName];
    }): EnhancedEmitter<Events, Hooks, EventsAndHooks>;
    on<EventName extends keyof EventsAndHooks>(eventName: EventName, handler: (event: Event<EventName, EventsAndHooks[EventName]>) => void): EnhancedEmitter<Events, Hooks, EventsAndHooks>;
    off<EventName extends keyof EventsAndHooks>(eventName: EventName): EnhancedEmitter<Events, Hooks, EventsAndHooks>;
    offHandler<EventName extends keyof EventsAndHooks>(eventName: EventName, handler: (event: Event<EventName, EventsAndHooks[EventName]>) => void): EnhancedEmitter<Events, Hooks, EventsAndHooks>;
    offAllEvents(): EnhancedEmitter<Events, Hooks, EventsAndHooks>;
    before<HookName extends keyof Hooks>(eventName: HookName, handler: (event: Event<HookName, Hooks[HookName]>) => void): EnhancedEmitter<Events, Hooks, EventsAndHooks>;
    offBefore<HookName extends keyof Hooks>(eventName: HookName): EnhancedEmitter<Events, Hooks, EventsAndHooks>;
    after<HookName extends keyof Hooks>(eventName: HookName, handler: (event: Event<HookName, Hooks[HookName]>) => void): EnhancedEmitter<Events, Hooks, EventsAndHooks>;
    offAfter<HookName extends keyof Hooks>(eventName: HookName): EnhancedEmitter<Events, Hooks, EventsAndHooks>;
    provideHook<HookName extends keyof Hooks>(eventOptions: {
        eventName: HookName;
        data: EventsAndHooks[HookName];
    }, defaultHandler: (event: Event<HookName, Hooks[HookName]>) => void): EnhancedEmitter<Events, Hooks, EventsAndHooks>;
}
