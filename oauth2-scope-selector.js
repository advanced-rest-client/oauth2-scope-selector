/**
@license
Copyright 2016 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {IronValidatableBehavior} from '@polymer/iron-validatable-behavior/iron-validatable-behavior.js';
import {IronControlState} from '@polymer/iron-behaviors/iron-control-state.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-toast/paper-toast.js';
import '@advanced-rest-client/arc-icons/arc-icons.js';
import '@advanced-rest-client/paper-autocomplete/paper-autocomplete.js';
/**
A selector for OAuth 2.0 scope. Provides the UI to enter a scope for OAuth 2.0 settings.

#### Example

```html
<oauth2-scope-selector></oauth2-scope-selector>
```

`allowed-scopes` attribute allows to provide a list of predefined scopes
supported by the endpoint. When the list is set, autocomplete is enabled.
Autocomplete is supported by `paper-autocomplete` element.

Setting `prevent-custom-scopes` dissallows adding a scope that is not defined
in the `allowed-scopes` array. This can only work with `allowed-scopes` set

#### Example

```html
<oauth2-scope-selector prevent-custom-scopes allowed-scopes='["email", "profile"]'></oauth2-scope-selector>
```

And in JavaScript

```javascript
var selector = document.querySelector('oauth2-scope-selector');
selector.allowedScopes = ['profile', 'email'];
```

## Adding scope documentation

`allowedScopes` property can be an list of object to present scope description
after it is selected. Object in the array has to contain `label` and `description` properties.
`label` is scope value.

### Example

```javascript
const scopes = [
  {
    'label': 'user',
    'description': 'Grants read/write access to profile info only. Note that this scope includes user:email and user:follow.'
  },
  {'label': 'user:email', 'description': 'Grants read access to a user\'s email addresses.'},
  {'label': 'user:follow', 'description': 'Grants access to follow or unfollow other users.'}
];
const selector = document.querySelector('oauth2-scope-selector');
selector.allowedScopes = scopes;
```

See demo page for example implementation.

## Use with forms

The element can be used in a form by using `iron-form` custom element.
It's value is reported to the form as any other form input. `name` attribute
must be set in order to process the value.

```html
<iron-form id="form">
  <form>
    <oauth2-scope-selector name="scope" required></oauth2-scope-selector>
  </form>
</iron-form>
<script>
const form = document.getElementById('form');
const values = form.serializeForm();
console.log(values); // {"scope": []}
</script>
```

## Changes in version 2

- `scopes` property is renamed to `value`
- The element can now work with `iron-form` as a form element.

### Styling
`<oauth2-scope-selector>` provides the following custom properties and mixins for styling:

Custom property | Description | Default
----------------|-------------|----------
`--oauth2-scope-selector` | Mixin applied to the element | `{}`
`--oauth2-scope-selector-label` | Mixin applied to the label element (title of the control) | `{}`
`--oauth2-scope-selector-list-item` | Mixin applied to each selected scope item. Consider setting `paper-item` styles for theming. | `{}`
`--oauth2-scope-selector-item-description-color` | Color of the description of the scope when `allowedScopes` contains description. | `#737373`

### Theming
Use this mixins as a theming option across all ARC elements.

Custom property | Description | Default
----------------|-------------|----------
`--icon-button` | Mixin applied to `paper-icon-buttons`. | `{}`
`--icon-button-hover` | Mixin applied to `paper-icon-buttons` when hovered. | `{}`
`--form-label` | Mixin applied to all labels that are form elements | `{}`
`--api-form-action-icon-color` | Color of the add and remove scope buttons | `rgba(0, 0, 0, 0.74)`
`--api-form-action-icon-hover-color` | Color of the add and remove scope buttons when hovered | `rgba(0, 0, 0, 0.84)`

@customElement
@polymer
@demo demo/index.html
@memberof UiElements
*/
class OAuth2ScopeSelector extends mixinBehaviors([IronControlState, IronValidatableBehavior], PolymerElement) {
  static get template() {
    return html`
    <style>
     :host {
      display: block;
      outline: none;
      @apply --oauth2-scope-selector;
    }

    .form-label {
      @apply --form-label;
      @apply --oauth2-scope-selector-label;
    }

    .item {
      width: calc(100% - 32px);
      @apply --oauth2-scope-selector-list-item;
    }

    paper-autocomplete {
      top: 52px;
    }

    .input-container {
      position: relative;
    }

    .add-button,
    .delete-icon {
      color: var(--api-form-action-icon-color, rgba(0, 0, 0, 0.74));
      transition: color 0.25s linear;
      margin-left: 8px;
      @apply --icon-button;
    }

    .add-button:hover,
    .delete-icon:hover {
      color: var(--api-form-action-icon-hover-color, rgba(0, 0, 0, 0.84));
      @apply --icon-button-hover;
    }

    .scope-item {
      @apply --layout-horizontal;
      @apply --layout-center;
    }

    .scope-display {
      overflow: hidden;
      @apply --arc-font-body1;
      font-size: 16px;
    }

    .scope-item[two-line] {
      margin-bottom: 12px;
    }

    .scope-item[two-line] .scope-display {
      font-weight: 400;
    }

    .scope-item-label {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .scope-display div[secondary] {
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      color: var(--oauth2-scope-selector-item-description-color, #737373);
    }
    </style>
    <div class="container">
      <label class="form-label">Scopes</label>
      <div class="input-container">
        <paper-input name="[[name]]" no-label-float="" invalid="[[invalid]]" label="Scope value"
          class="scope-input" value="{{currentValue}}" on-keydown="_keyDown" autocomplete="off"
          title="Enter authorization scopes for this API endpoint.">
          <paper-icon-button class="add-button" data-action="add-scope"
            slot="suffix" icon="arc:add-circle-outline"
            on-click="_appendScope" title="Add scope"></paper-icon-button>
        </paper-input>
        <template is="dom-if" if="[[hasAutocomplete]]">
          <paper-autocomplete target="[[inputTarget]]" source="[[_autocompleteScopes]]"
            on-selected="_suggestionSelected" open-on-focus=""></paper-autocomplete>
        </template>
      </div>
      <section class="scopes-list" role="list">
        <template is="dom-repeat" items="[[value]]">
          <div class="scope-item" two-line\$="[[_allowedIsObject]]">
            <div class="scope-display">
              <div class="scope-item-label">[[item]]</div>
              <div secondary="">[[_computeItemDescription(item, _allowedIsObject)]]</div>
            </div>
            <paper-icon-button class="delete-icon" data-action="remove-scope"
              icon="arc:remove-circle-outline" on-click="_removeScope" title="Remove scope"></paper-icon-button>
          </div>
        </template>
      </section>
    </div>
    <paper-toast missing-scope="" text="Enter scope value to add a scope."></paper-toast>
    <paper-toast dissalowed="" text="You can't enter this scope. Use one of the provided scopes."></paper-toast>
`;
  }

  static get is() {
    return 'oauth2-scope-selector';
  }
  static get properties() {
    return {
      /**
       * List of scopes entered by the user. It can be used it pre-select scopes
       * by providing an array with scope values.
       */
      value: {
        type: Array,
        value: function() {
          return [];
        },
        notify: true
      },
      /**
       * Form input name
       */
      name: String,
      /**
       * Current value entered by the user. This is not a scope and it is not
       * yet in the scopes list. User has to accept the scope before it become
       * available in the scopes list.
       */
      currentValue: String,
      // Target for `paper-autocomplete`
      inputTarget: {
        type: HTMLElement,
        readOnly: true
      },
      /**
       * List of available scopes.
       * It can be either list of string or list of object. If this is the
       * list of object then this expects to each object contain a `label`
       * and `description` keys.
       *
       * ### Example
       * ```
       * {
       *   'label': 'user',
       *   'description': 'Grants read/write access to profile info only. '
       * }
       * ```
       * When the description is provided it will be displayed below the name
       * of the scope.
       */
      allowedScopes: Array,
      // If true then scopes that are in the `allowedScopes` list will be
      // allowed to be add.
      preventCustomScopes: Boolean,
      // Computed value, true if the `allowedScopes` is a list of objects
      _allowedIsObject: {
        type: Boolean,
        value: false,
        computed: '_computeAllowedIsObject(allowedScopes)'
      },
      /**
       * Set to true to auto-validate the input value when it changes.
       */
      autoValidate: Boolean,
      /**
       * List of scopes to be set as autocomplete source.
       */
      _autocompleteScopes: {
        type: Array,
        computed: '_normalizeScopes(allowedScopes)'
      },
      /**
       * True if the element has attached autocomplete element.
       *
       * @type {Object}
       */
      hasAutocomplete: {
        type: Boolean,
        computed: '_computeHasAutocomplete(_autocompleteScopes)'
      },
      /**
       * Returns true if the value is invalid.
       *
       * If `autoValidate` is true, the `invalid` attribute is managed automatically,
       * which can clobber attempts to manage it manually.
       */
      invalid: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true,
        observer: '_invalidChanged'
      },
      /**
       * Set to true to mark the input as required.
       */
      required: {
        type: Boolean,
        value: false
      }
    };
  }

  static get observers() {
    return [
      '_handleAutoValidate(autoValidate, value.*)'
    ];
  }

  ready() {
    super.ready();
    this._ensureAttribute('tabindex', -1);
    this._setInputTarget(this.shadowRoot.querySelector('.scope-input'));
  }

  _invalidChanged(invalid) {
    this.setAttribute('aria-invalid', invalid);
  }

  // Add currently entered scope value to the scopes list.
  _appendScope() {
    const value = this.currentValue;
    if (!value) {
      this.shadowRoot.querySelector('paper-toast[missing-scope]').opened = true;
      return;
    }
    this.currentValue = '';
    this.append(value);
  }
  // Remove scope button click handler
  _removeScope(e) {
    const repeater = this.shadowRoot
    .querySelector('.scopes-list > dom-repeat, template[is="dom-repeat"]');
    const item = repeater.itemForElement(e.target);
    if (!item) {
      return;
    }
    const all = this.value;
    const index = all.indexOf(item);
    if (index === -1) {
      return;
    }
    this.splice('value', index, 1);
  }
  /**
   * Handler for the `paper-autocomplete` selected event.
   *
   * @param {Event} e
   */
  _suggestionSelected(e) {
    e.preventDefault();

    const scope = e.detail.value;
    this.append(scope);
    setTimeout(() => {
      this.currentValue = '';
    }, 1);
  }
  /**
   * Adds a scope to the list. The same as pushing item to the `scopes`
   * array but it will check for duplicates first.
   *
   * @param {String} scope Scope value to append
   */
  append(scope) {
    const scopeValue = typeof scope === 'string' ? scope : scope.value;
    const all = this.value;
    let index = all.indexOf(scopeValue);
    if (index !== -1) {
      return;
    }
    if (this.preventCustomScopes && this.allowedScopes &&
      this.allowedScopes.length) {
      index = this._findAllowedScopeIndex(scopeValue);
      if (index === -1) {
        this.shadowRoot.querySelector('paper-toast[dissalowed]').opened = true;
        return;
      }
    }
    this.push('value', scopeValue);
  }
  /**
   * Finds an index if the `scope` in the `allowedScopes` list.
   *
   * @param {String} scope A scope value (label) to find.
   * @return {Number} An index of scope or `-1` if not found.
   */
  _findAllowedScopeIndex(scope) {
    let index = -1;
    const scopes = this.allowedScopes;
    if (!scopes || !scopes.length || !scope) {
      return index;
    }
    if (this._allowedIsObject) {
      index = scopes.findIndex((item) => item.label === scope);
    } else {
      index = this.allowedScopes.indexOf(scope);
    }
    return index;
  }
  // A handler for the input's key down event. Handles ENTER press.
  _keyDown(e) {
    if (e.keyCode !== 13) {
      return;
    }
    const ac = this.shadowRoot.querySelector('paper-autocomplete');
    if (ac && ac.opened) {
      return;
    }
    this._appendScope();
    this.currentValue = '';
  }
  /**
   * Normalizes scopes to use it with autocomplete element.
   *
   * @param {Array} scopes List of autocomplete values. Can be list of
   * strings or objects
   * @return {Array} Normalized scopes list for autocomplete.
   */
  _normalizeScopes(scopes) {
    if (!scopes || !scopes.length) {
      return undefined;
    }
    return scopes.map((item) => {
      if (typeof item === 'string') {
        return item;
      }
      return {
        'display': item.label,
        'value': item.label,
      };
    });
  }
  /**
   * Computes value for `hasAutocomplete`.
   *
   * @param {?Array} scopes List of scopes
   * @return {Boolean} True if scopes are set
   */
  _computeHasAutocomplete(scopes) {
    return !!(scopes && scopes.length);
  }
  /**
   * Compute function for the _allowedIsObject. Check first item of the
   * `allowedScopes` array if it is an object (return `true`) or
   * string (return `false`);
   * @param {Array<String>|Array<Object>} allowedScopes
   * @return {Boolean}
   */
  _computeAllowedIsObject(allowedScopes) {
    if (!allowedScopes || !allowedScopes.length) {
      return false;
    }
    const first = allowedScopes[0];
    return typeof first !== 'string';
  }
  /**
   * Returns a description for the selected scope.
   *
   * @param {String} scope Scope name
   * @param {Boolean} allowedIsObject True if allowed scopes is an object.
   * @return {String} Description of the scope or `` (empty string) if the
   * item do not exists.
   */
  _computeItemDescription(scope, allowedIsObject) {
    if (!allowedIsObject) {
      return;
    }
    const index = this._findAllowedScopeIndex(scope);
    if (index === -1) {
      return '';
    }
    return this.allowedScopes[index].description;
  }

  /**
   * Returns false if the element is required and does not have a selection,
   * and true otherwise.
   *
   * @return {boolean} true if `required` is false, or if `required` is true
   * and the element has a valid selection.
   */
  _getValidity() {
    return this.disabled || !this.required || (this.required &&
      !!(this.value && this.value.length));
  }

  _handleAutoValidate(autoValidate) {
    if (autoValidate) {
      this.invalid = !this._getValidity();
    }
  }
}
window.customElements.define(OAuth2ScopeSelector.is, OAuth2ScopeSelector);
