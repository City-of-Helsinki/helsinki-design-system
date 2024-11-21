import getFocusEventBlurredElement from './getBlurredElementFromFocusEvent';

/**
 * Helper that gets the focused element from blur event
 *  From https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/relatedTarget
 * relatedTarget: The EventTarget receiving focus (if any).
 *
 * @param e FocusEvent
 */

// blurred element in onFocus event and focused element in onBlur event are identical.
// both pick same thing, so this is just a clearer wrapper for same function. onBlur is also triggered by a FocusEvent.
export default getFocusEventBlurredElement;
