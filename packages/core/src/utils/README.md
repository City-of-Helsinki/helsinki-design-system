# Why

The purpose of this library is to create css with sass functions that can emit partial css rules, all possible rules or both with renamed/custom css selectors.

For example the css

```css
.my-button--primary--small__label {
  // contents
}
```

can be split into following parts:

- core css of the `my-button`
- css for the `primary` variant
- css for the `small` variant
- css for the label element

```css
// emits everything
@include Button();
// emits the "small" modifier and "label" element
@include Button({$modifiers:'small', $elements:'label'});
```

# About BEM

BEM methology has three entities: "block", "modifier" and "element". This library is mainly created for BEM input/output and therefore the parameters are related to BEM.

Read more about bem

# How create mixins

The final css is created with sass mixins which are then included where ever the css is needed.

### Example

SCSS files should import the `_exports.scss` and have a `@mixin` with three named parameters. The parameters are passed to the `init-multi-sass` function that controls which css is emitted.

#### The SCSS file

The following scss is saved as `my-button.scss`.

```css
@use '../exports' as *;

@mixin MyButton($elements: true, $modifiers: true, $extras: true) {
  // init and start the block css process
  // returned value from a function must be handled, so "$void" has to be used here.
  $void: init-multi-sass(
    $modifiers: $modifiers,
    $elements: $elements,
    $extras: $extras,
    $block: 'test',
  );

  // block is usually the first selector
  @include block {
    @include content {
      // base css for the block
    }

    @include element('label') {
      // css for the nested "label" element
    }

    @include modifier('primary') {
      // css for the "primary" variant
      @include element('label') {
        // css for the nested "label" element in the "primary" variant
      }
    }
  }
  // define where the process ends, so processes can be nested.
  $void: end-multi-sass();
}
```

#### Usage of the SCSS file

```css
@use '../my-button' as *;
// emit all scss
@include MyButton;
// emit only "label" of the "primary" variant.

@include MyButton(
  $modifiers: (
    'primary': (
      'label': true
    )
  )
);
```

## Parameters

### Rules

The parameters of the mixins are called rules.

`$modifiers` define the rules for the emitted css of all modifiers.
`$elements` define the rules for the emitted css of all elements.
`$extras` define the rules for other emitted css, like media queries or special cases.

In some cases you only want parts of the css, not everything. These rules control the emitted output. The output of a modifier, element or extra can be either allowed or disallowed. By default, all outputs is allowed.

### Other parameters

`$block` is just a name used in the selector of the block element.
`$alias` is for customising selectors.
`$config` is for overriding default settings.

## Blocks

```css
// scss
@include block {
  // contents
}

// results in (by default, the 'blockName' is set in config)
.hds-blockName {
  // contents
}
```

## Modifiers

```css
// scss
@include block {
  @include modifier('modifierName') {
    // contents
  }
}

// results in
.hds-blockName__modifierName {
  // contents
}
```

## Elements

```css
// scss
@include block {
  @include modifier('modifierName') {
    @include element('elementName') {
      // contents A
    }
  }
  @include element('elementName') {
    // contents B
  }
}

// results in
.hds-blockName__modifierName--elementName {
  // contents A
}
.hds-blockName--elementName {
  // contents B
}
```

There are also other importable @includes

- content
- extra
- custom
- if-content-allowed
- selector-list
- compound-entity?
- descendant-entity?
- compound-block-modifier
- descendant-modifier-element
- block-element
- descendant
- class
- repeat
- repeat-with-replace
- create-custom-selector
- create-custom-level

Explanations below.

## Rule logic

If the value is a boolean, "true" allows everything and "false" disallows.

If the value is a string, it names the allowed modifier/element. All other ones are disallowed and not emitted.

If the value is a map, it has name/rule pairs that names explicitly what modifiers/elements are emitted.

**Very important rule to remember: if one named entity is allowed, all other ones are disallowed!**

### The "modifiers" rule

Modifers to emit. By default all modifiers are emitted.

The value can be a boolean, string or map.

Boolean true/false allows/disallows all modifiers. Default is

```css
$modifiers: true;
```

If value is a string, only that modifier is emitted.

```css
$modifiers: 'name of the modifier';
```

If value is a map, modifiers are emitted according to the values.

```css
$modifiers: (
  'modifierA': false,
  'modifierB': false
);
```

All modifiers except "modifierA" and "modifierB" are emitted.

Note that the following settings are identical

```css
$modifiers: (
  'modifierA': true
);
$modifiers: 'modifierA';
```

If an modifier is explicity allowed, all other modifiers are disallowed. Unless also allowed explicitly.

Disallowing 'modifierB' is not necessary here:

```css
$modifiers: (
  'modifierA': true,
  'modifierB': false
);
```

Multiple entities are allowed by naming them explicitly.

```css
$modifiers: (
  'modifierA': true,
  'modifierB': true
);
```

Only modifiers "modifierA" and "modifierB" are emitted.

**If a modifier is set, base elements are not allowed!**

#### "modifiers" elements

Single element in a modifier can be allowed or disallowed

```css
$modifiers: (
  'modifierA': (
    'element': true
  ),
  'modifierB': 'element'
);
```

The 'element' and only that element is emitted in the modifiers.

### The "elements" rule

The "elements" define what css for elements should be outputted.

#### The "base" element

There is a special element named "base" which is for the base rules for block, modifiers and element.

```css
.block {
  block base rules
  color: #f00;

  .block--modifier {
    modifier base rules
    background-color: #f00;
    .block__element {
      element base rules
      padding: 0;
    }
  }
}
```

To control the output of base rules, `@content("base")` should be used. There is no automatic way to pick base rules, so the css must be wrapped.

Usually base is only used in the block level, because other entities are controlled with "elements" and "modifiers".

--
"base" is reserved element name to target rules for the base css of an entity
CSS:
.block--modifier-dark {
padding:0;
margin: 0;
&\_\_element-button {
}
}

The "padding" and "margin" are base css. In order to prevent them to be emitted, the should be marked as "base". See @exported.scss

Elements can be allowed/disallowed in "modifiers", and the rules set in "modifiers" override "elements".

("elements":"buttons","modifiers":"dark")
Only the element "buttons" in the modifier named "dark" is emitted. The base css of the "modifierName" is not emitted.

"elements":("buttons":true,"select":false) ,
"modifiers":("dark":("buttons":false,"select":true),"light":("select":true))
Emits only "select" element in "dark" and "light" modifiers.
--

**If a modifier is set, base elements are not allowed!**

!! content() is ruled with elements
!! extra, extra-selector is ruled with extras

### The "extras" rule

The "extras" should only be "name:true/false" values.

### What about "content"?

The argument for the `@contents($elementName)` is an element's name. Usually only "base" is used.

### Values

## Special cases

### No need for block's base styles / base styles NOT outputted

If any modifier's in the parameters are explicitly set to "true"/"string", the block's base styles are NOT outputted.
If parameter "modifiers" is omitted, all base styles are outputted
If parameter "modifiers" is "true", all base styles are outputted
If parameter "modifiers" is a map and any ("modifierName":true/string), base styles are NOT outputted

#### Need block base styles and a modifier together?

Add two calls to the scss function,

### Config

Can have added values
