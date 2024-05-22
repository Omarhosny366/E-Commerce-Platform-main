"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/login",{

/***/ "./pages/login/index.js":
/*!******************************!*\
  !*** ./pages/login/index.js ***!
  \******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"../../../../node_modules/axios/index.js\");\n/* harmony import */ var _styles_login_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../styles/login.module.css */ \"./styles/login.module.css\");\n/* harmony import */ var _styles_login_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_login_module_css__WEBPACK_IMPORTED_MODULE_4__);\n\nvar _s = $RefreshSig$();\n\n\n\n\nconst Login = ()=>{\n    _s();\n    const [email, setEmail] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [password, setPassword] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const handleLogin = async (e)=>{\n        e.preventDefault();\n        try {\n            const response = await axios__WEBPACK_IMPORTED_MODULE_3__[\"default\"].post(\"http://localhost:3000/user/login\", {\n                email,\n                password\n            });\n            if (response.status === 200) {\n                console.log(\"Login successful\", response.data);\n                router.push(\"/Home\");\n            } else {\n                setError(\"Invalid login credentials\");\n            }\n        } catch (error) {\n            console.error(\"Error logging in:\", error);\n            setError(\"Failed to login. Please try again.\");\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_styles_login_module_css__WEBPACK_IMPORTED_MODULE_4___default().background),\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: (_styles_login_module_css__WEBPACK_IMPORTED_MODULE_4___default().container),\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                    className: (_styles_login_module_css__WEBPACK_IMPORTED_MODULE_4___default().logo),\n                    children: \"Login\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\login\\\\index.js\",\n                    lineNumber: 36,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                    className: (_styles_login_module_css__WEBPACK_IMPORTED_MODULE_4___default().form),\n                    onSubmit: handleLogin,\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                            type: \"text\",\n                            value: email,\n                            onChange: (e)=>setEmail(e.target.value),\n                            className: (_styles_login_module_css__WEBPACK_IMPORTED_MODULE_4___default().input),\n                            placeholder: \"Email or phone number\",\n                            required: true\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\login\\\\index.js\",\n                            lineNumber: 39,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                            type: \"password\",\n                            value: password,\n                            onChange: (e)=>setPassword(e.target.value),\n                            className: (_styles_login_module_css__WEBPACK_IMPORTED_MODULE_4___default().input),\n                            placeholder: \"Password\",\n                            required: true\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\login\\\\index.js\",\n                            lineNumber: 47,\n                            columnNumber: 11\n                        }, undefined),\n                        error && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            className: (_styles_login_module_css__WEBPACK_IMPORTED_MODULE_4___default().error),\n                            children: error\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\login\\\\index.js\",\n                            lineNumber: 55,\n                            columnNumber: 21\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            type: \"submit\",\n                            className: (_styles_login_module_css__WEBPACK_IMPORTED_MODULE_4___default().registerButton),\n                            children: \"Login\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\login\\\\index.js\",\n                            lineNumber: 56,\n                            columnNumber: 11\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\login\\\\index.js\",\n                    lineNumber: 38,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                    className: (_styles_login_module_css__WEBPACK_IMPORTED_MODULE_4___default().toggleButton),\n                    onClick: ()=>router.push(\"/register\"),\n                    children: \"Don't have an account? Register\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\login\\\\index.js\",\n                    lineNumber: 61,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                    className: (_styles_login_module_css__WEBPACK_IMPORTED_MODULE_4___default().toggleButton),\n                    onClick: ()=>router.push(\"/reset\"),\n                    children: \"Forgot your password? again? haha, Goreset it\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\login\\\\index.js\",\n                    lineNumber: 67,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: (_styles_login_module_css__WEBPACK_IMPORTED_MODULE_4___default().bottomContent),\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                            className: (_styles_login_module_css__WEBPACK_IMPORTED_MODULE_4___default().descriptionHeading),\n                            children: \"Welcome to Seelaz!\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\login\\\\index.js\",\n                            lineNumber: 75,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            className: (_styles_login_module_css__WEBPACK_IMPORTED_MODULE_4___default().description),\n                            children: \"Welcome to our premier destination for plastic pallets! Discover a wide selection of colors, sizes, and durable materials conveniently curated in one place. Whether you require solutions for storage, shipping, or organizational needs, we offer precisely what you seek. Enjoy our diverse range and competitive pricing. Start your search for high-quality plastic pallets from the comfort of your home today!\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\login\\\\index.js\",\n                            lineNumber: 76,\n                            columnNumber: 11\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\login\\\\index.js\",\n                    lineNumber: 74,\n                    columnNumber: 9\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\login\\\\index.js\",\n            lineNumber: 35,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\login\\\\index.js\",\n        lineNumber: 34,\n        columnNumber: 5\n    }, undefined);\n};\n_s(Login, \"vqoSUWQrhSY7vqCkL4CT1RcZgR8=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = Login;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Login);\nvar _c;\n$RefreshReg$(_c, \"Login\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9sb2dpbi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBd0M7QUFDQTtBQUNkO0FBQ3lCO0FBRW5ELE1BQU1LLFFBQVE7O0lBQ1osTUFBTSxDQUFDQyxPQUFPQyxTQUFTLEdBQUdOLCtDQUFRQSxDQUFDO0lBQ25DLE1BQU0sQ0FBQ08sVUFBVUMsWUFBWSxHQUFHUiwrQ0FBUUEsQ0FBQztJQUN6QyxNQUFNLENBQUNTLE9BQU9DLFNBQVMsR0FBR1YsK0NBQVFBLENBQUM7SUFDbkMsTUFBTVcsU0FBU1Ysc0RBQVNBO0lBRXhCLE1BQU1XLGNBQWMsT0FBT0M7UUFDekJBLEVBQUVDLGNBQWM7UUFFaEIsSUFBSTtZQUNGLE1BQU1DLFdBQVcsTUFBTWIsa0RBQVUsQ0FBQyxvQ0FBb0M7Z0JBQ3BFRztnQkFDQUU7WUFDRjtZQUVBLElBQUlRLFNBQVNFLE1BQU0sS0FBSyxLQUFLO2dCQUMzQkMsUUFBUUMsR0FBRyxDQUFDLG9CQUFvQkosU0FBU0ssSUFBSTtnQkFDN0NULE9BQU9VLElBQUksQ0FBQztZQUNkLE9BQU87Z0JBQ0xYLFNBQVM7WUFDWDtRQUNGLEVBQUUsT0FBT0QsT0FBTztZQUNkUyxRQUFRVCxLQUFLLENBQUMscUJBQXFCQTtZQUNuQ0MsU0FBUztRQUNYO0lBQ0Y7SUFFQSxxQkFDRSw4REFBQ1k7UUFBSUMsV0FBV3BCLDRFQUFpQjtrQkFDL0IsNEVBQUNtQjtZQUFJQyxXQUFXcEIsMkVBQWdCOzs4QkFDOUIsOERBQUN1QjtvQkFBR0gsV0FBV3BCLHNFQUFXOzhCQUFFOzs7Ozs7OEJBRTVCLDhEQUFDeUI7b0JBQUtMLFdBQVdwQixzRUFBVztvQkFBRTBCLFVBQVVqQjs7c0NBQ3RDLDhEQUFDa0I7NEJBQ0NDLE1BQUs7NEJBQ0xDLE9BQU8zQjs0QkFDUDRCLFVBQVUsQ0FBQ3BCLElBQU1QLFNBQVNPLEVBQUVxQixNQUFNLENBQUNGLEtBQUs7NEJBQ3hDVCxXQUFXcEIsdUVBQVk7NEJBQ3ZCZ0MsYUFBWTs0QkFDWkMsUUFBUTs7Ozs7O3NDQUVWLDhEQUFDTjs0QkFDQ0MsTUFBSzs0QkFDTEMsT0FBT3pCOzRCQUNQMEIsVUFBVSxDQUFDcEIsSUFBTUwsWUFBWUssRUFBRXFCLE1BQU0sQ0FBQ0YsS0FBSzs0QkFDM0NULFdBQVdwQix1RUFBWTs0QkFDdkJnQyxhQUFZOzRCQUNaQyxRQUFROzs7Ozs7d0JBRVQzQix1QkFBUyw4REFBQzRCOzRCQUFFZCxXQUFXcEIsdUVBQVk7c0NBQUdNOzs7Ozs7c0NBQ3ZDLDhEQUFDNkI7NEJBQU9QLE1BQUs7NEJBQVNSLFdBQVdwQixnRkFBcUI7c0NBQUU7Ozs7Ozs7Ozs7Ozs4QkFLMUQsOERBQUNtQztvQkFDQ2YsV0FBV3BCLDhFQUFtQjtvQkFDOUJzQyxTQUFTLElBQU05QixPQUFPVSxJQUFJLENBQUM7OEJBQzVCOzs7Ozs7OEJBR0QsOERBQUNpQjtvQkFDQ2YsV0FBV3BCLDhFQUFtQjtvQkFDOUJzQyxTQUFTLElBQU05QixPQUFPVSxJQUFJLENBQUM7OEJBQzVCOzs7Ozs7OEJBSUQsOERBQUNDO29CQUFJQyxXQUFXcEIsK0VBQW9COztzQ0FDbEMsOERBQUN3Qzs0QkFBR3BCLFdBQVdwQixvRkFBeUI7c0NBQUU7Ozs7OztzQ0FDMUMsOERBQUNrQzs0QkFBRWQsV0FBV3BCLDZFQUFrQjtzQ0FBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFXNUM7R0FqRk1DOztRQUlXSCxrREFBU0E7OztLQUpwQkc7QUFtRk4sK0RBQWVBLEtBQUtBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvbG9naW4vaW5kZXguanM/OTFmYSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJztcclxuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuLi8uLi9zdHlsZXMvbG9naW4ubW9kdWxlLmNzcyc7XHJcblxyXG5jb25zdCBMb2dpbiA9ICgpID0+IHtcclxuICBjb25zdCBbZW1haWwsIHNldEVtYWlsXSA9IHVzZVN0YXRlKCcnKTtcclxuICBjb25zdCBbcGFzc3dvcmQsIHNldFBhc3N3b3JkXSA9IHVzZVN0YXRlKCcnKTtcclxuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKCcnKTtcclxuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTG9naW4gPSBhc3luYyAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MucG9zdCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL3VzZXIvbG9naW4nLCB7XHJcbiAgICAgICAgZW1haWwsXHJcbiAgICAgICAgcGFzc3dvcmQsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0xvZ2luIHN1Y2Nlc3NmdWwnLCByZXNwb25zZS5kYXRhKTtcclxuICAgICAgICByb3V0ZXIucHVzaCgnL0hvbWUnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZXRFcnJvcignSW52YWxpZCBsb2dpbiBjcmVkZW50aWFscycpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBsb2dnaW5nIGluOicsIGVycm9yKTtcclxuICAgICAgc2V0RXJyb3IoJ0ZhaWxlZCB0byBsb2dpbi4gUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5iYWNrZ3JvdW5kfT5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jb250YWluZXJ9PlxyXG4gICAgICAgIDxoMSBjbGFzc05hbWU9e3N0eWxlcy5sb2dvfT5Mb2dpbjwvaDE+XHJcblxyXG4gICAgICAgIDxmb3JtIGNsYXNzTmFtZT17c3R5bGVzLmZvcm19IG9uU3VibWl0PXtoYW5kbGVMb2dpbn0+XHJcbiAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICB2YWx1ZT17ZW1haWx9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0RW1haWwoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5pbnB1dH1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbWFpbCBvciBwaG9uZSBudW1iZXJcIlxyXG4gICAgICAgICAgICByZXF1aXJlZFxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxyXG4gICAgICAgICAgICB2YWx1ZT17cGFzc3dvcmR9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0UGFzc3dvcmQoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5pbnB1dH1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiXHJcbiAgICAgICAgICAgIHJlcXVpcmVkXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAge2Vycm9yICYmIDxwIGNsYXNzTmFtZT17c3R5bGVzLmVycm9yfT57ZXJyb3J9PC9wPn1cclxuICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzTmFtZT17c3R5bGVzLnJlZ2lzdGVyQnV0dG9ufT5cclxuICAgICAgICAgICAgTG9naW5cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZm9ybT5cclxuXHJcbiAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMudG9nZ2xlQnV0dG9ufVxyXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gcm91dGVyLnB1c2goJy9yZWdpc3RlcicpfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIERvbid0IGhhdmUgYW4gYWNjb3VudD8gUmVnaXN0ZXJcclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy50b2dnbGVCdXR0b259XHJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiByb3V0ZXIucHVzaCgnL3Jlc2V0Jyl9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIEZvcmdvdCB5b3VyIHBhc3N3b3JkPyBhZ2Fpbj8gaGFoYSwgR29yZXNldCBpdFxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmJvdHRvbUNvbnRlbnR9PlxyXG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT17c3R5bGVzLmRlc2NyaXB0aW9uSGVhZGluZ30+V2VsY29tZSB0byBTZWVsYXohPC9oMj5cclxuICAgICAgICAgIDxwIGNsYXNzTmFtZT17c3R5bGVzLmRlc2NyaXB0aW9ufT5cclxuICAgICAgICAgICAgV2VsY29tZSB0byBvdXIgcHJlbWllciBkZXN0aW5hdGlvbiBmb3IgcGxhc3RpYyBwYWxsZXRzISBEaXNjb3ZlciBhIHdpZGUgc2VsZWN0aW9uIG9mXHJcbiAgICAgICAgICAgIGNvbG9ycywgc2l6ZXMsIGFuZCBkdXJhYmxlIG1hdGVyaWFscyBjb252ZW5pZW50bHkgY3VyYXRlZCBpbiBvbmUgcGxhY2UuIFdoZXRoZXIgeW91XHJcbiAgICAgICAgICAgIHJlcXVpcmUgc29sdXRpb25zIGZvciBzdG9yYWdlLCBzaGlwcGluZywgb3Igb3JnYW5pemF0aW9uYWwgbmVlZHMsIHdlIG9mZmVyIHByZWNpc2VseSB3aGF0XHJcbiAgICAgICAgICAgIHlvdSBzZWVrLiBFbmpveSBvdXIgZGl2ZXJzZSByYW5nZSBhbmQgY29tcGV0aXRpdmUgcHJpY2luZy4gU3RhcnQgeW91ciBzZWFyY2ggZm9yXHJcbiAgICAgICAgICAgIGhpZ2gtcXVhbGl0eSBwbGFzdGljIHBhbGxldHMgZnJvbSB0aGUgY29tZm9ydCBvZiB5b3VyIGhvbWUgdG9kYXkhXHJcbiAgICAgICAgICA8L3A+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExvZ2luO1xyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsInVzZVJvdXRlciIsImF4aW9zIiwic3R5bGVzIiwiTG9naW4iLCJlbWFpbCIsInNldEVtYWlsIiwicGFzc3dvcmQiLCJzZXRQYXNzd29yZCIsImVycm9yIiwic2V0RXJyb3IiLCJyb3V0ZXIiLCJoYW5kbGVMb2dpbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInJlc3BvbnNlIiwicG9zdCIsInN0YXR1cyIsImNvbnNvbGUiLCJsb2ciLCJkYXRhIiwicHVzaCIsImRpdiIsImNsYXNzTmFtZSIsImJhY2tncm91bmQiLCJjb250YWluZXIiLCJoMSIsImxvZ28iLCJmb3JtIiwib25TdWJtaXQiLCJpbnB1dCIsInR5cGUiLCJ2YWx1ZSIsIm9uQ2hhbmdlIiwidGFyZ2V0IiwicGxhY2Vob2xkZXIiLCJyZXF1aXJlZCIsInAiLCJidXR0b24iLCJyZWdpc3RlckJ1dHRvbiIsInRvZ2dsZUJ1dHRvbiIsIm9uQ2xpY2siLCJib3R0b21Db250ZW50IiwiaDIiLCJkZXNjcmlwdGlvbkhlYWRpbmciLCJkZXNjcmlwdGlvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/login/index.js\n"));

/***/ })

});