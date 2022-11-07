export default class Event<EventName extends string = string, EventData extends any = void> {
    eventName: EventName;
    data: EventData;
    isDefaultPrevented: boolean;
    isCancelled: boolean;
    isPropagationStopped: boolean;
    constructor(options: {
        eventName: EventName;
        data: EventData;
    });
    preventDefault(): void;
    cancel(): void;
    stopPropagation(): void;
}
