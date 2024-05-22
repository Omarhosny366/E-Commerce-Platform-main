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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"../../../../node_modules/axios/index.js\");\n/* harmony import */ var _styles_login_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../styles/login.module.css */ \"./styles/login.module.css\");\n/* harmony import */ var _styles_login_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_login_module_css__WEBPACK_IMPORTED_MODULE_4__);\n// pages/login.js\n\nvar _s = $RefreshSig$();\n\n\n // Import axios\n\nconst Login = ()=>{\n    _s();\n    const [email, setEmail] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [password, setPassword] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\"); // State to handle error messages\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const handleLogin = async (e)=>{\n        e.preventDefault();\n        try {\n            const response = await axios__WEBPACK_IMPORTED_MODULE_3__[\"default\"].post(\"http://localhost:3000/user/login\", {\n                email,\n                password\n            });\n            if (response.status === 200) {\n                console.log(\"Login successful\", response.data);\n                router.push(\"/home\"); // Redirect to home page on successful login\n            } else {\n                setError(\"Invalid login credentials\");\n            }\n        } catch (error) {\n            console.error(\"Error logging in:\", error);\n            setError(\"Failed to login. Please try again.\");\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_styles_login_module_css__WEBPACK_IMPORTED_MODULE_4___default().background),\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: (_styles_login_module_css__WEBPACK_IMPORTED_MODULE_4___default().container),\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                    className: (_styles_login_module_css__WEBPACK_IMPORTED_MODULE_4___default().logo),\n                    children: \"Login\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\login\\\\index.js\",\n                    lineNumber: 38,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                    className: (_styles_login_module_css__WEBPACK_IMPORTED_MODULE_4___default().form),\n                    onSubmit: handleLogin,\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                            type: \"text\",\n                            value: email,\n                            onChange: (e)=>setEmail(e.target.value),\n                            className: (_styles_login_module_css__WEBPACK_IMPORTED_MODULE_4___default().input),\n                            placeholder: \"Email \",\n                            required: true\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\login\\\\index.js\",\n                            lineNumber: 41,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                            type: \"password\",\n                            value: password,\n                            onChange: (e)=>setPassword(e.target.value),\n                            className: (_styles_login_module_css__WEBPACK_IMPORTED_MODULE_4___default().input),\n                            placeholder: \"Password\",\n                            required: true\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\login\\\\index.js\",\n                            lineNumber: 49,\n                            columnNumber: 11\n                        }, undefined),\n                        error && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            className: (_styles_login_module_css__WEBPACK_IMPORTED_MODULE_4___default().error),\n                            children: error\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\login\\\\index.js\",\n                            lineNumber: 57,\n                            columnNumber: 21\n                        }, undefined),\n                        \" \",\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            type: \"submit\",\n                            className: (_styles_login_module_css__WEBPACK_IMPORTED_MODULE_4___default().registerButton),\n                            children: \"Login\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\login\\\\index.js\",\n                            lineNumber: 58,\n                            columnNumber: 11\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\login\\\\index.js\",\n                    lineNumber: 40,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                    className: (_styles_login_module_css__WEBPACK_IMPORTED_MODULE_4___default().toggleButton),\n                    onClick: ()=>router.push(\"/register\"),\n                    children: \"Don't have an account? Register\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\login\\\\index.js\",\n                    lineNumber: 63,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: (_styles_login_module_css__WEBPACK_IMPORTED_MODULE_4___default().bottomContent),\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                            className: (_styles_login_module_css__WEBPACK_IMPORTED_MODULE_4___default().descriptionHeading),\n                            children: \"Welcome to Seelaz!\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\login\\\\index.js\",\n                            lineNumber: 71,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            className: (_styles_login_module_css__WEBPACK_IMPORTED_MODULE_4___default().description),\n                            children: \"Welcome to our premier destination for plastic pallets! Discover a wide selection of colors, sizes, and durable materials conveniently curated in one place. Whether you require solutions for storage, shipping, or organizational needs, we offer precisely what you seek. Enjoy our diverse range and competitive pricing. Start your search for high-quality plastic pallets from the comfort of your home today!\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\login\\\\index.js\",\n                            lineNumber: 72,\n                            columnNumber: 11\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\login\\\\index.js\",\n                    lineNumber: 70,\n                    columnNumber: 9\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\login\\\\index.js\",\n            lineNumber: 37,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\login\\\\index.js\",\n        lineNumber: 36,\n        columnNumber: 5\n    }, undefined);\n};\n_s(Login, \"vqoSUWQrhSY7vqCkL4CT1RcZgR8=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = Login;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Login);\nvar _c;\n$RefreshReg$(_c, \"Login\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9sb2dpbi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUJBQWlCOzs7QUFFdUI7QUFDQTtBQUNkLENBQUMsZUFBZTtBQUNTO0FBRW5ELE1BQU1LLFFBQVE7O0lBQ1osTUFBTSxDQUFDQyxPQUFPQyxTQUFTLEdBQUdOLCtDQUFRQSxDQUFDO0lBQ25DLE1BQU0sQ0FBQ08sVUFBVUMsWUFBWSxHQUFHUiwrQ0FBUUEsQ0FBQztJQUN6QyxNQUFNLENBQUNTLE9BQU9DLFNBQVMsR0FBR1YsK0NBQVFBLENBQUMsS0FBSyxpQ0FBaUM7SUFDekUsTUFBTVcsU0FBU1Ysc0RBQVNBO0lBRXhCLE1BQU1XLGNBQWMsT0FBT0M7UUFDekJBLEVBQUVDLGNBQWM7UUFFaEIsSUFBSTtZQUNGLE1BQU1DLFdBQVcsTUFBTWIsa0RBQVUsQ0FBQyxvQ0FBb0M7Z0JBQ3BFRztnQkFDQUU7WUFDRjtZQUVBLElBQUlRLFNBQVNFLE1BQU0sS0FBSyxLQUFLO2dCQUMzQkMsUUFBUUMsR0FBRyxDQUFDLG9CQUFvQkosU0FBU0ssSUFBSTtnQkFDN0NULE9BQU9VLElBQUksQ0FBQyxVQUFVLDRDQUE0QztZQUNwRSxPQUFPO2dCQUNMWCxTQUFTO1lBQ1g7UUFDRixFQUFFLE9BQU9ELE9BQU87WUFDZFMsUUFBUVQsS0FBSyxDQUFDLHFCQUFxQkE7WUFDbkNDLFNBQVM7UUFDWDtJQUNGO0lBRUEscUJBQ0UsOERBQUNZO1FBQUlDLFdBQVdwQiw0RUFBaUI7a0JBQy9CLDRFQUFDbUI7WUFBSUMsV0FBV3BCLDJFQUFnQjs7OEJBQzlCLDhEQUFDdUI7b0JBQUdILFdBQVdwQixzRUFBVzs4QkFBRTs7Ozs7OzhCQUU1Qiw4REFBQ3lCO29CQUFLTCxXQUFXcEIsc0VBQVc7b0JBQUUwQixVQUFVakI7O3NDQUN0Qyw4REFBQ2tCOzRCQUNDQyxNQUFLOzRCQUNMQyxPQUFPM0I7NEJBQ1A0QixVQUFVLENBQUNwQixJQUFNUCxTQUFTTyxFQUFFcUIsTUFBTSxDQUFDRixLQUFLOzRCQUN4Q1QsV0FBV3BCLHVFQUFZOzRCQUN2QmdDLGFBQVk7NEJBQ1pDLFFBQVE7Ozs7OztzQ0FFViw4REFBQ047NEJBQ0NDLE1BQUs7NEJBQ0xDLE9BQU96Qjs0QkFDUDBCLFVBQVUsQ0FBQ3BCLElBQU1MLFlBQVlLLEVBQUVxQixNQUFNLENBQUNGLEtBQUs7NEJBQzNDVCxXQUFXcEIsdUVBQVk7NEJBQ3ZCZ0MsYUFBWTs0QkFDWkMsUUFBUTs7Ozs7O3dCQUVUM0IsdUJBQVMsOERBQUM0Qjs0QkFBRWQsV0FBV3BCLHVFQUFZO3NDQUFHTTs7Ozs7O3dCQUFXO3NDQUNsRCw4REFBQzZCOzRCQUFPUCxNQUFLOzRCQUFTUixXQUFXcEIsZ0ZBQXFCO3NDQUFFOzs7Ozs7Ozs7Ozs7OEJBSzFELDhEQUFDbUM7b0JBQ0NmLFdBQVdwQiw4RUFBbUI7b0JBQzlCc0MsU0FBUyxJQUFNOUIsT0FBT1UsSUFBSSxDQUFDOzhCQUM1Qjs7Ozs7OzhCQUlELDhEQUFDQztvQkFBSUMsV0FBV3BCLCtFQUFvQjs7c0NBQ2xDLDhEQUFDd0M7NEJBQUdwQixXQUFXcEIsb0ZBQXlCO3NDQUFFOzs7Ozs7c0NBQzFDLDhEQUFDa0M7NEJBQUVkLFdBQVdwQiw2RUFBa0I7c0NBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBVzVDO0dBM0VNQzs7UUFJV0gsa0RBQVNBOzs7S0FKcEJHO0FBNkVOLCtEQUFlQSxLQUFLQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3BhZ2VzL2xvZ2luL2luZGV4LmpzPzkxZmEiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gcGFnZXMvbG9naW4uanNcclxuXHJcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnOyAvLyBJbXBvcnQgYXhpb3NcclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuLi8uLi9zdHlsZXMvbG9naW4ubW9kdWxlLmNzcyc7XHJcblxyXG5jb25zdCBMb2dpbiA9ICgpID0+IHtcclxuICBjb25zdCBbZW1haWwsIHNldEVtYWlsXSA9IHVzZVN0YXRlKCcnKTtcclxuICBjb25zdCBbcGFzc3dvcmQsIHNldFBhc3N3b3JkXSA9IHVzZVN0YXRlKCcnKTtcclxuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKCcnKTsgLy8gU3RhdGUgdG8gaGFuZGxlIGVycm9yIG1lc3NhZ2VzXHJcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUxvZ2luID0gYXN5bmMgKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLnBvc3QoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC91c2VyL2xvZ2luJywge1xyXG4gICAgICAgIGVtYWlsLFxyXG4gICAgICAgIHBhc3N3b3JkLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdMb2dpbiBzdWNjZXNzZnVsJywgcmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgcm91dGVyLnB1c2goJy9ob21lJyk7IC8vIFJlZGlyZWN0IHRvIGhvbWUgcGFnZSBvbiBzdWNjZXNzZnVsIGxvZ2luXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2V0RXJyb3IoJ0ludmFsaWQgbG9naW4gY3JlZGVudGlhbHMnKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbG9nZ2luZyBpbjonLCBlcnJvcik7XHJcbiAgICAgIHNldEVycm9yKCdGYWlsZWQgdG8gbG9naW4uIFBsZWFzZSB0cnkgYWdhaW4uJyk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuYmFja2dyb3VuZH0+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuY29udGFpbmVyfT5cclxuICAgICAgICA8aDEgY2xhc3NOYW1lPXtzdHlsZXMubG9nb30+TG9naW48L2gxPlxyXG5cclxuICAgICAgICA8Zm9ybSBjbGFzc05hbWU9e3N0eWxlcy5mb3JtfSBvblN1Ym1pdD17aGFuZGxlTG9naW59PlxyXG4gICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgdmFsdWU9e2VtYWlsfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEVtYWlsKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuaW5wdXR9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW1haWwgXCJcclxuICAgICAgICAgICAgcmVxdWlyZWRcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcclxuICAgICAgICAgICAgdmFsdWU9e3Bhc3N3b3JkfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFBhc3N3b3JkKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuaW5wdXR9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIlxyXG4gICAgICAgICAgICByZXF1aXJlZFxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIHtlcnJvciAmJiA8cCBjbGFzc05hbWU9e3N0eWxlcy5lcnJvcn0+e2Vycm9yfTwvcD59IHsvKiBEaXNwbGF5IGVycm9yIG1lc3NhZ2UgKi99XHJcbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzc05hbWU9e3N0eWxlcy5yZWdpc3RlckJ1dHRvbn0+XHJcbiAgICAgICAgICAgIExvZ2luXHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Zvcm0+XHJcblxyXG4gICAgICAgIDxidXR0b25cclxuICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLnRvZ2dsZUJ1dHRvbn1cclxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHJvdXRlci5wdXNoKCcvcmVnaXN0ZXInKX0gLy8gTmF2aWdhdGUgdG8gcmVnaXN0ZXIgcGFnZSBvbiBjbGlja1xyXG4gICAgICAgID5cclxuICAgICAgICAgIERvbid0IGhhdmUgYW4gYWNjb3VudD8gUmVnaXN0ZXJcclxuICAgICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5ib3R0b21Db250ZW50fT5cclxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9e3N0eWxlcy5kZXNjcmlwdGlvbkhlYWRpbmd9PldlbGNvbWUgdG8gU2VlbGF6ITwvaDI+XHJcbiAgICAgICAgICA8cCBjbGFzc05hbWU9e3N0eWxlcy5kZXNjcmlwdGlvbn0+XHJcbiAgICAgICAgICAgIFdlbGNvbWUgdG8gb3VyIHByZW1pZXIgZGVzdGluYXRpb24gZm9yIHBsYXN0aWMgcGFsbGV0cyEgRGlzY292ZXIgYSB3aWRlIHNlbGVjdGlvbiBvZlxyXG4gICAgICAgICAgICBjb2xvcnMsIHNpemVzLCBhbmQgZHVyYWJsZSBtYXRlcmlhbHMgY29udmVuaWVudGx5IGN1cmF0ZWQgaW4gb25lIHBsYWNlLiBXaGV0aGVyIHlvdVxyXG4gICAgICAgICAgICByZXF1aXJlIHNvbHV0aW9ucyBmb3Igc3RvcmFnZSwgc2hpcHBpbmcsIG9yIG9yZ2FuaXphdGlvbmFsIG5lZWRzLCB3ZSBvZmZlciBwcmVjaXNlbHkgd2hhdFxyXG4gICAgICAgICAgICB5b3Ugc2Vlay4gRW5qb3kgb3VyIGRpdmVyc2UgcmFuZ2UgYW5kIGNvbXBldGl0aXZlIHByaWNpbmcuIFN0YXJ0IHlvdXIgc2VhcmNoIGZvclxyXG4gICAgICAgICAgICBoaWdoLXF1YWxpdHkgcGxhc3RpYyBwYWxsZXRzIGZyb20gdGhlIGNvbWZvcnQgb2YgeW91ciBob21lIHRvZGF5IVxyXG4gICAgICAgICAgPC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMb2dpbjtcclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VSb3V0ZXIiLCJheGlvcyIsInN0eWxlcyIsIkxvZ2luIiwiZW1haWwiLCJzZXRFbWFpbCIsInBhc3N3b3JkIiwic2V0UGFzc3dvcmQiLCJlcnJvciIsInNldEVycm9yIiwicm91dGVyIiwiaGFuZGxlTG9naW4iLCJlIiwicHJldmVudERlZmF1bHQiLCJyZXNwb25zZSIsInBvc3QiLCJzdGF0dXMiLCJjb25zb2xlIiwibG9nIiwiZGF0YSIsInB1c2giLCJkaXYiLCJjbGFzc05hbWUiLCJiYWNrZ3JvdW5kIiwiY29udGFpbmVyIiwiaDEiLCJsb2dvIiwiZm9ybSIsIm9uU3VibWl0IiwiaW5wdXQiLCJ0eXBlIiwidmFsdWUiLCJvbkNoYW5nZSIsInRhcmdldCIsInBsYWNlaG9sZGVyIiwicmVxdWlyZWQiLCJwIiwiYnV0dG9uIiwicmVnaXN0ZXJCdXR0b24iLCJ0b2dnbGVCdXR0b24iLCJvbkNsaWNrIiwiYm90dG9tQ29udGVudCIsImgyIiwiZGVzY3JpcHRpb25IZWFkaW5nIiwiZGVzY3JpcHRpb24iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/login/index.js\n"));

/***/ })

});