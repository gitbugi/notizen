'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">notizen documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-d9002beedd7c7efb37f8d8247ec3276a519171d1614bfd4c506cc59deb0722e31addd51021a259c1c38bbd41ed687352d65634caf701fa17ff9640d08cd540fa"' : 'data-target="#xs-components-links-module-AppModule-d9002beedd7c7efb37f8d8247ec3276a519171d1614bfd4c506cc59deb0722e31addd51021a259c1c38bbd41ed687352d65634caf701fa17ff9640d08cd540fa"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-d9002beedd7c7efb37f8d8247ec3276a519171d1614bfd4c506cc59deb0722e31addd51021a259c1c38bbd41ed687352d65634caf701fa17ff9640d08cd540fa"' :
                                            'id="xs-components-links-module-AppModule-d9002beedd7c7efb37f8d8247ec3276a519171d1614bfd4c506cc59deb0722e31addd51021a259c1c38bbd41ed687352d65634caf701fa17ff9640d08cd540fa"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-d9002beedd7c7efb37f8d8247ec3276a519171d1614bfd4c506cc59deb0722e31addd51021a259c1c38bbd41ed687352d65634caf701fa17ff9640d08cd540fa"' : 'data-target="#xs-injectables-links-module-AppModule-d9002beedd7c7efb37f8d8247ec3276a519171d1614bfd4c506cc59deb0722e31addd51021a259c1c38bbd41ed687352d65634caf701fa17ff9640d08cd540fa"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-d9002beedd7c7efb37f8d8247ec3276a519171d1614bfd4c506cc59deb0722e31addd51021a259c1c38bbd41ed687352d65634caf701fa17ff9640d08cd540fa"' :
                                        'id="xs-injectables-links-module-AppModule-d9002beedd7c7efb37f8d8247ec3276a519171d1614bfd4c506cc59deb0722e31addd51021a259c1c38bbd41ed687352d65634caf701fa17ff9640d08cd540fa"' }>
                                        <li class="link">
                                            <a href="injectables/DatabaseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabaseService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DetailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DetailService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/InitializeAppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InitializeAppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SQLiteService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SQLiteService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/DatabaseService.html" data-type="entity-link" >DatabaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DetailService.html" data-type="entity-link" >DetailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InitializeAppService.html" data-type="entity-link" >InitializeAppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SQLiteService.html" data-type="entity-link" >SQLiteService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/listdata.html" data-type="entity-link" >listdata</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SQLiteDBConnectionCallback.html" data-type="entity-link" >SQLiteDBConnectionCallback</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});