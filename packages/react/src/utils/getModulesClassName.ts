/**
 * Helper that returns the css/scss module class name without other classes names.
 * E.g. using composes in a rule adds the composed class name to the selector.
 * @param className
 */
export default (className: string): string => className.substring(0, className.indexOf(' '));
