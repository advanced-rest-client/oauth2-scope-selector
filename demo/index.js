import {
  html
} from 'lit-html';
import {
  ArcDemoPage
} from '@advanced-rest-client/arc-demo-helper/ArcDemoPage.js';
import '@advanced-rest-client/arc-demo-helper/arc-demo-helper.js';
import '@advanced-rest-client/arc-demo-helper/arc-interactive-demo.js';
import '@anypoint-web-components/anypoint-checkbox/anypoint-checkbox.js';
import '../oauth2-scope-selector.js';

class ComponentDemo extends ArcDemoPage {
  constructor() {
    super();
    this.initObservableProperties([
      'demoOutlined',
      'demoLegacy',
      'readOnly',
      'mainValue'
    ]);
    this._componentName = 'oauth2-scope-selector';
    this.demoStates = ['Filled', 'Outlined', 'Legacy'];
    this._mainDemoStateHandler = this._mainDemoStateHandler.bind(this);
    this._toggleMainOption = this._toggleMainOption.bind(this);
    this._mainValueHandler = this._mainValueHandler.bind(this);

    this.complexScopes = [{
        'label': 'user',
        'description': 'Grants read/write access to profile info only. Note that this scope includes user:email and user:follow.'
      },
      {
        'label': 'user:email',
        'description': 'Grants read access to a user\'s email addresses.'
      },
      {
        'label': 'user:follow',
        'description': 'Grants access to follow or unfollow other users.'
      },
      {
        'label': 'public_repo',
        'description': 'Grants read/write access to code, commit statuses, collaborators, and deployment statuses for public repositories and organizations. Also required for starring public repositories.'
      },
      {
        'label': 'repo',
        'description': 'Grants read/write access to code, commit statuses, repository invitations, collaborators, and deployment statuses for public and private repositories and organizations.'
      },
      {
        'label': 'repo_deployment',
        'description': 'Grants access to deployment statuses for public and private repositories. This scope is only necessary to grant other users or services access to deployment statuses, without granting access to the code.'
      },
      {
        'label': 'repo:status',
        'description': 'Grants read/write access to public and private repository commit statuses. This scope is only necessary to grant other users or services access to private repository commit statuses without granting access to the code.'
      },
      {
        'label': 'delete_repo',
        'description': 'Grants access to delete adminable repositories.'
      },
      {
        'label': 'notifications',
        'description': 'Grants read access to a user\'s notifications. repo also provides this access.'
      },
      {
        'label': 'gist',
        'description': 'Grants write access to gists.'
      },
      {
        'label': 'read:repo_hook',
        'description': 'Grants read and ping access to hooks in public or private repositories.'
      },
      {
        'label': 'write:repo_hook',
        'description': 'Grants read, write, and ping access to hooks in public or private repositories.'
      },
      {
        'label': 'admin:repo_hook',
        'description': 'Grants read, write, ping, and delete access to hooks in public or private repositories.'
      },
      {
        'label': 'admin:org_hook',
        'description': 'Grants read, write, ping, and delete access to organization hooks. '
      },
      {
        'label': 'read:org',
        'description': 'Read-only access to organization, teams, and membership.'
      },
      {
        'label': 'write:org',
        'description': 'Publicize and unpublicize organization membership.'
      },
      {
        'label': 'admin:org',
        'description': 'Fully manage organization, teams, and memberships.'
      },
      {
        'label': 'read:public_key',
        'description': 'List and view details for public keys.'
      },
      {
        'label': 'write:public_key',
        'description': 'Create, list, and view details for public keys.'
      },
      {
        'label': 'admin:public_key',
        'description': 'Fully manage public keys.'
      },
      {
        'label': 'read:gpg_key',
        'description': 'List and view details for GPG keys.'
      },
      {
        'label': 'write:gpg_key',
        'description': 'Create, list, and view details for GPG keys.'
      },
      {
        'label': 'admin:gpg_key',
        'description': 'Fully manage GPG keys.'
      }
    ];

    this.simpleScopes = [
      'user', 'user:email', 'user:follow', 'public_repo', 'repo', 'repo_deployment',
      'repo:status', 'delete_repo', 'notifications', 'gist', 'read:repo_hook',
      'write:repo_hook', 'admin:repo_hook', 'admin:org_hook', 'read:org',
      'write:org', 'admin:org', 'read:public_key', 'write:public_key', 'admin:public_key',
      'read:gpg_key', 'write:gpg_key', 'admin:gpg_key'
    ];
  }

  _mainDemoStateHandler(e) {
    const state = e.detail.value;
    switch (state) {
      case 0:
        this.demoOutlined = false;
        this.demoLegacy = false;
        break;
      case 1:
        this.demoOutlined = true;
        this.demoLegacy = false;
        break;
      case 2:
        this.demoOutlined = false;
        this.demoLegacy = true;
        break;
    }
  }

  _toggleMainOption(e) {
    const {
      name,
      checked
    } = e.target;
    this[name] = checked;
  }

  _mainValueHandler(e) {
    this.mainValue = e.detail.value;
    console.log(this.mainValue);
  }

  _demoTemplate() {
    const {
      demoStates,
      darkThemeActive,
      demoOutlined,
      demoLegacy,
      readOnly
    } = this;
    return html `<section class="documentation-section">
    <h3>Interactive demo</h3>
    <p>
      This demo lets you preview the oauth2 scope selector element with various
      configuration options.
    </p>
    <arc-interactive-demo
      .states="${demoStates}"
      @state-chanegd="${this._mainDemoStateHandler}"
      ?dark="${darkThemeActive}"
    >

      <oauth2-scope-selector
        slot="content"
        required
        autovalidate
        @value-changed="${this._mainValueHandler}"
        ?outlined="${demoOutlined}"
        ?legacy="${demoLegacy}"
        ?readOnly="${readOnly}"></oauth2-scope-selector>

      <label slot="options" id="mainOptionsLabel">Options</label>
      <anypoint-checkbox
        aria-describedby="mainOptionsLabel"
        slot="options"
        name="readOnly"
        @change="${this._toggleMainOption}"
        >Read only</anypoint-checkbox
      >
    </arc-interactive-demo>
    </section>`;
  }

  _introductionTemplate() {
    return html `
      <section class="documentation-section">
        <h3>Introduction</h3>
        <p>
          A web component to render accessible OAuth 2 scope selector where a user can
          enter scopes values.
        </p>
        <p>
          This component implements Material Design styles.
        </p>
      </section>
    `;
  }

  _usageTemplate() {
    return html `
      <section class="documentation-section">
        <h2>Usage</h2>
        <p>Anypoint dropdown menu comes with 3 predefied styles:</p>
        <ul>
          <li><b>Filled</b> (default)</li>
          <li><b>Outlined</b></li>
          <li>
            <b>Legacy</b> - To provide compatibility with legacy Anypoint design
          </li>
        </ul>

        <h3>Predefined scopes</h3>
        <p>
          Use <code>allowedScopes</code> property to define a list of scopes that
          are allowed as an input. When the user try to add scope other than defined
          the element render invalid sate.
        </p>

        <oauth2-scope-selector .allowedScopes="${this.simpleScopes}" autovalidate></oauth2-scope-selector>

        <details>
          <summary>Code example</summary>
          <code>
            <pre>
${`<oauth2-scope-selector allowedscopes='["user", "user:email", "user:follow", "..."]' autovalidate></oauth2-scope-selector>`}
            </pre>
          </code>
        </details>

        <h3>Predefined invalid input</h3>
        <p>
          Use <code>preventCustomScopes</code> with combination with <code>allowedScopes</code>
          to disallow providing values that are now allowed.
        </p>

        <oauth2-scope-selector .allowedScopes="${this.simpleScopes}" preventcustomscopes></oauth2-scope-selector>

        <details>
          <summary>Code example</summary>
          <code>
            <pre>
${`<oauth2-scope-selector preventcustomscopes allowedscopes='["user", "user:email", "user:follow", "..."]' autovalidate></oauth2-scope-selector>`}
            </pre>
          </code>
        </details>

        <h3>Scope description</h3>
        <p>
          When the user enter scope value the element renders scope description if provided in <code>allowedScopes</code>
          value.
        </p>

        <oauth2-scope-selector .allowedScopes="${this.complexScopes}" preventcustomscopes></oauth2-scope-selector>

        <details>
          <summary>Code example</summary>
          <code>
            <pre>
${`<oauth2-scope-selector preventcustomscopes allowedscopes='[{"label":"user:email", "description": "..."}]' autovalidate></oauth2-scope-selector>`}
            </pre>
          </code>
        </details>
      </section>`;
  }


  contentTemplate() {
    return html `
      <h2>Anypoint dropdown menu</h2>
      ${this._demoTemplate()}
      ${this._introductionTemplate()}
      ${this._usageTemplate()}
    `;
  }
}
const instance = new ComponentDemo();
instance.render();
window.demo = instance;
