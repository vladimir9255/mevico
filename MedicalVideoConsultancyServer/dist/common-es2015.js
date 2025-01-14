(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./node_modules/ng2-tel-input/__ivy_ngcc__/esm2015/ng2-tel-input.js":
/*!**************************************************************************!*\
  !*** ./node_modules/ng2-tel-input/__ivy_ngcc__/esm2015/ng2-tel-input.js ***!
  \**************************************************************************/
/*! exports provided: Ng2TelInput, Ng2TelInputModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ng2TelInput", function() { return Ng2TelInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ng2TelInputModule", function() { return Ng2TelInputModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");



/**
 * @fileoverview added by tsickle
 * Generated from: src/ng2-tel-input.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */

const defaultUtilScript = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.1/js/utils.js';
class Ng2TelInput {
    /**
     * @param {?} el
     * @param {?} platformId
     */
    constructor(el, platformId) {
        this.el = el;
        this.platformId = platformId;
        this.ng2TelInputOptions = {};
        this.hasError = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.ng2TelOutput = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.countryChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.intlTelInputObject = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_1__["isPlatformBrowser"])(this.platformId)) {
            this.ng2TelInputOptions = Object.assign({}, this.ng2TelInputOptions, { utilsScript: this.getUtilsScript(this.ng2TelInputOptions) });
            this.ngTelInput = window.intlTelInput(this.el.nativeElement, Object.assign({}, this.ng2TelInputOptions));
            this.el.nativeElement.addEventListener("countrychange", (/**
             * @return {?}
             */
            () => {
                this.countryChange.emit(this.ngTelInput.getSelectedCountryData());
            }));
            this.intlTelInputObject.emit(this.ngTelInput);
        }
    }
    /**
     * @return {?}
     */
    onBlur() {
        /** @type {?} */
        let isInputValid = this.isInputValid();
        if (isInputValid) {
            /** @type {?} */
            let telOutput = this.ngTelInput.getNumber();
            this.hasError.emit(isInputValid);
            this.ng2TelOutput.emit(telOutput);
        }
        else {
            this.hasError.emit(isInputValid);
        }
    }
    /**
     * @return {?}
     */
    isInputValid() {
        return this.ngTelInput.isValidNumber();
    }
    /**
     * @param {?} country
     * @return {?}
     */
    setCountry(country) {
        this.ngTelInput.setCountry(country);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    getUtilsScript(options) {
        return options.utilsScript || defaultUtilScript;
    }
}
Ng2TelInput.ɵfac = function Ng2TelInput_Factory(t) { return new (t || Ng2TelInput)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["PLATFORM_ID"])); };
Ng2TelInput.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: Ng2TelInput, selectors: [["", "ng2TelInput", ""]], hostBindings: function Ng2TelInput_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("blur", function Ng2TelInput_blur_HostBindingHandler($event) { return ctx.onBlur(); });
    } }, inputs: { ng2TelInputOptions: "ng2TelInputOptions" }, outputs: { hasError: "hasError", ng2TelOutput: "ng2TelOutput", countryChange: "countryChange", intlTelInputObject: "intlTelInputObject" } });
/** @nocollapse */
Ng2TelInput.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] },
    { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["PLATFORM_ID"],] }] }
];
Ng2TelInput.propDecorators = {
    ng2TelInputOptions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['ng2TelInputOptions',] }],
    hasError: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"], args: ['hasError',] }],
    ng2TelOutput: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"], args: ['ng2TelOutput',] }],
    countryChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"], args: ['countryChange',] }],
    intlTelInputObject: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"], args: ['intlTelInputObject',] }],
    onBlur: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['blur',] }]
};
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](Ng2TelInput, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
        args: [{
                selector: '[ng2TelInput]'
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }, { type: String, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["PLATFORM_ID"]]
            }] }]; }, { ng2TelInputOptions: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['ng2TelInputOptions']
        }], hasError: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
            args: ['hasError']
        }], ng2TelOutput: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
            args: ['ng2TelOutput']
        }], countryChange: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
            args: ['countryChange']
        }], intlTelInputObject: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
            args: ['intlTelInputObject']
        }], onBlur: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['blur']
        }] }); })();

/**
 * @fileoverview added by tsickle
 * Generated from: src/ng2-tel-input.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Ng2TelInputModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: Ng2TelInputModule,
            providers: []
        };
    }
}
Ng2TelInputModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: Ng2TelInputModule });
Ng2TelInputModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function Ng2TelInputModule_Factory(t) { return new (t || Ng2TelInputModule)(); } });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](Ng2TelInputModule, { declarations: [Ng2TelInput], exports: [Ng2TelInput] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](Ng2TelInputModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [Ng2TelInput],
                exports: [Ng2TelInput]
            }]
    }], null, null); })();



//# sourceMappingURL=ng2-tel-input.js.map

/***/ }),

/***/ "./src/app/_helpers/must-match.validator.ts":
/*!**************************************************!*\
  !*** ./src/app/_helpers/must-match.validator.ts ***!
  \**************************************************/
/*! exports provided: MustMatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MustMatch", function() { return MustMatch; });
// custom validator to check that two fields match
function MustMatch(controlName, matchingControlName) {
    return (formGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }
        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        }
        else {
            matchingControl.setErrors(null);
        }
    };
}


/***/ })

}]);
//# sourceMappingURL=common-es2015.js.map