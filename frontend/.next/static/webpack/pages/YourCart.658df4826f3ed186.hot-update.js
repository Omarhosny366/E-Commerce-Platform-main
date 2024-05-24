"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/YourCart",{

/***/ "./pages/YourCart/index.js":
/*!*********************************!*\
  !*** ./pages/YourCart/index.js ***!
  \*********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ \"../../../../node_modules/axios/index.js\");\n/* harmony import */ var _components_Navbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Navbar */ \"./pages/components/Navbar.js\");\n/* harmony import */ var _styles_YourCart_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../styles/YourCart.module.css */ \"./styles/YourCart.module.css\");\n/* harmony import */ var _styles_YourCart_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_YourCart_module_css__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _components_footerr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/footerr */ \"./pages/components/footerr.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\nconst YourCart = ()=>{\n    _s();\n    const [cartItems, setCartItems] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [totalPrice, setTotalPrice] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);\n    const [downpayment, setDownpayment] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        axios__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"http://localhost:3001/cart\").then((response)=>{\n            const data = response.data;\n            setCartItems(data.items);\n            setTotalPrice(data.totalPrice);\n            setDownpayment(data.downpayment);\n        }).catch((error)=>console.error(\"Error fetching cart data:\", error));\n    }, []);\n    const handleQuantityChange = (id, newQuantity)=>{\n        setCartItems(cartItems.map((item)=>item._id === id ? {\n                ...item,\n                quantity: newQuantity\n            } : item));\n    };\n    const handleRemoveItem = async (productId)=>{\n        try {\n            const response = await axios__WEBPACK_IMPORTED_MODULE_4__[\"default\"][\"delete\"](\"http://localhost:3001/customized-products/\".concat(productId));\n            if (response.status >= 200 && response.status < 300) {\n                toast.success(\"Product deleted successfully\");\n                setCustomizedProducts(customizedProducts.filter((product)=>product._id !== productId));\n            }\n        } catch (error) {\n            console.error(\"Error deleting product:\", error);\n            toast.error(\"Failed to delete product\");\n        }\n    };\n    const calculateTotal = ()=>{\n        return cartItems.reduce((total, item)=>total + item.price * item.quantity, 0);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_styles_YourCart_module_css__WEBPACK_IMPORTED_MODULE_5___default().container),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Navbar__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\YourCart\\\\index.js\",\n                lineNumber: 49,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                className: (_styles_YourCart_module_css__WEBPACK_IMPORTED_MODULE_5___default().title),\n                children: \"Your Cart\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\YourCart\\\\index.js\",\n                lineNumber: 50,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"table\", {\n                className: (_styles_YourCart_module_css__WEBPACK_IMPORTED_MODULE_5___default().cartTable),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"thead\", {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tr\", {\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                    children: \"Product Name\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\YourCart\\\\index.js\",\n                                    lineNumber: 54,\n                                    columnNumber: 13\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                    children: \"Product ID\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\YourCart\\\\index.js\",\n                                    lineNumber: 55,\n                                    columnNumber: 13\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                    children: \"Price\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\YourCart\\\\index.js\",\n                                    lineNumber: 56,\n                                    columnNumber: 13\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                    children: \"Type\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\YourCart\\\\index.js\",\n                                    lineNumber: 57,\n                                    columnNumber: 13\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                    children: \"Material\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\YourCart\\\\index.js\",\n                                    lineNumber: 58,\n                                    columnNumber: 13\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                    children: \"Dimensions\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\YourCart\\\\index.js\",\n                                    lineNumber: 59,\n                                    columnNumber: 13\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                    children: \"Quantity\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\YourCart\\\\index.js\",\n                                    lineNumber: 60,\n                                    columnNumber: 13\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                    children: \"Total\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\YourCart\\\\index.js\",\n                                    lineNumber: 61,\n                                    columnNumber: 13\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                    children: \"Action\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\YourCart\\\\index.js\",\n                                    lineNumber: 62,\n                                    columnNumber: 13\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\YourCart\\\\index.js\",\n                            lineNumber: 53,\n                            columnNumber: 11\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\YourCart\\\\index.js\",\n                        lineNumber: 52,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tbody\", {\n                        children: cartItems.map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tr\", {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                        children: item.name\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\YourCart\\\\index.js\",\n                                        lineNumber: 68,\n                                        columnNumber: 15\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                        children: item.product_id\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\YourCart\\\\index.js\",\n                                        lineNumber: 69,\n                                        columnNumber: 15\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                        children: [\n                                            \"$\",\n                                            item.price.toFixed(2)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\YourCart\\\\index.js\",\n                                        lineNumber: 70,\n                                        columnNumber: 15\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                        children: item.type\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\YourCart\\\\index.js\",\n                                        lineNumber: 71,\n                                        columnNumber: 15\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                        children: item.material\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\YourCart\\\\index.js\",\n                                        lineNumber: 72,\n                                        columnNumber: 15\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                        children: item.dimensions\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\YourCart\\\\index.js\",\n                                        lineNumber: 73,\n                                        columnNumber: 15\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                        children: item.quantity\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\YourCart\\\\index.js\",\n                                        lineNumber: 74,\n                                        columnNumber: 15\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                        children: [\n                                            \"$\",\n                                            (item.price * item.quantity).toFixed(2)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\YourCart\\\\index.js\",\n                                        lineNumber: 80,\n                                        columnNumber: 15\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                            onClick: ()=>handleRemoveItem(item._id),\n                                            className: (_styles_YourCart_module_css__WEBPACK_IMPORTED_MODULE_5___default().removeButton),\n                                            children: \"Remove\"\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\YourCart\\\\index.js\",\n                                            lineNumber: 82,\n                                            columnNumber: 17\n                                        }, undefined)\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\YourCart\\\\index.js\",\n                                        lineNumber: 81,\n                                        columnNumber: 15\n                                    }, undefined)\n                                ]\n                            }, item._id, true, {\n                                fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\YourCart\\\\index.js\",\n                                lineNumber: 67,\n                                columnNumber: 13\n                            }, undefined))\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\YourCart\\\\index.js\",\n                        lineNumber: 65,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\YourCart\\\\index.js\",\n                lineNumber: 51,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_YourCart_module_css__WEBPACK_IMPORTED_MODULE_5___default().totalContainer),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                        children: [\n                            \"Total: $\",\n                            calculateTotal().toFixed(2)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\YourCart\\\\index.js\",\n                        lineNumber: 94,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                        children: [\n                            \"Downpayment: $\",\n                            downpayment.toFixed(2)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\YourCart\\\\index.js\",\n                        lineNumber: 95,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: (_styles_YourCart_module_css__WEBPACK_IMPORTED_MODULE_5___default().checkoutButton),\n                        children: \"Proceed to Checkout\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\YourCart\\\\index.js\",\n                        lineNumber: 97,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\YourCart\\\\index.js\",\n                lineNumber: 93,\n                columnNumber: 7\n            }, undefined),\n            \"=    \"\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Lenovo L340\\\\Desktop\\\\seelaz-backend-main-main\\\\seelaz-backend-main\\\\frontend\\\\pages\\\\YourCart\\\\index.js\",\n        lineNumber: 48,\n        columnNumber: 5\n    }, undefined);\n};\n_s(YourCart, \"+nGFNJ+JYozOQyTWU/yBAavfCSo=\");\n_c = YourCart;\n/* harmony default export */ __webpack_exports__[\"default\"] = (YourCart);\nvar _c;\n$RefreshReg$(_c, \"YourCart\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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REFFSTVCLEtBQUtFLFFBQVE7Ozs7OztrREFJbEIsOERBQUMwQjs7NENBQUc7NENBQUc1QixDQUFBQSxLQUFLZ0IsS0FBSyxHQUFHaEIsS0FBS0UsUUFBUSxFQUFFNkIsT0FBTyxDQUFDOzs7Ozs7O2tEQUMzQyw4REFBQ0g7a0RBQ0MsNEVBQUNPOzRDQUNDQyxTQUFTLElBQU1qQyxpQkFBaUJILEtBQUtDLEdBQUc7NENBQ3hDaUIsV0FBV3ZDLGlGQUFtQjtzREFDL0I7Ozs7Ozs7Ozs7OzsrQkFsQklxQixLQUFLQyxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7OzBCQTBCdkIsOERBQUNnQjtnQkFBSUMsV0FBV3ZDLG1GQUFxQjs7a0NBQ25DLDhEQUFDNEQ7OzRCQUFHOzRCQUFTMUIsaUJBQWlCa0IsT0FBTyxDQUFDOzs7Ozs7O2tDQUN0Qyw4REFBQ1M7OzRCQUFHOzRCQUFldEQsWUFBWTZDLE9BQU8sQ0FBQzs7Ozs7OztrQ0FFdkMsOERBQUNJO3dCQUFPakIsV0FBV3ZDLG1GQUFxQjtrQ0FBRTs7Ozs7Ozs7Ozs7O1lBQ3RDOzs7Ozs7O0FBR1o7R0EvRk1FO0tBQUFBO0FBaUdOLCtEQUFlQSxRQUFRQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3BhZ2VzL1lvdXJDYXJ0L2luZGV4LmpzPzg0MmYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcbmltcG9ydCBOYXZiYXIgZnJvbSAnLi4vY29tcG9uZW50cy9OYXZiYXInO1xyXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4uLy4uL3N0eWxlcy9Zb3VyQ2FydC5tb2R1bGUuY3NzJztcclxuaW1wb3J0IEZvb3RlciBmcm9tICcuLi9jb21wb25lbnRzL2Zvb3RlcnInO1xyXG5jb25zdCBZb3VyQ2FydCA9ICgpID0+IHtcclxuICBjb25zdCBbY2FydEl0ZW1zLCBzZXRDYXJ0SXRlbXNdID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFt0b3RhbFByaWNlLCBzZXRUb3RhbFByaWNlXSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtkb3ducGF5bWVudCwgc2V0RG93bnBheW1lbnRdID0gdXNlU3RhdGUoMCk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBheGlvcy5nZXQoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMS9jYXJ0JylcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgIHNldENhcnRJdGVtcyhkYXRhLml0ZW1zKTtcclxuICAgICAgICBzZXRUb3RhbFByaWNlKGRhdGEudG90YWxQcmljZSk7XHJcbiAgICAgICAgc2V0RG93bnBheW1lbnQoZGF0YS5kb3ducGF5bWVudCk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBjYXJ0IGRhdGE6JywgZXJyb3IpKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVF1YW50aXR5Q2hhbmdlID0gKGlkLCBuZXdRdWFudGl0eSkgPT4ge1xyXG4gICAgc2V0Q2FydEl0ZW1zKFxyXG4gICAgICBjYXJ0SXRlbXMubWFwKGl0ZW0gPT5cclxuICAgICAgICBpdGVtLl9pZCA9PT0gaWQgPyB7IC4uLml0ZW0sIHF1YW50aXR5OiBuZXdRdWFudGl0eSB9IDogaXRlbVxyXG4gICAgICApXHJcbiAgICApO1xyXG4gIH07XHJcbiAgY29uc3QgaGFuZGxlUmVtb3ZlSXRlbSA9IGFzeW5jIChwcm9kdWN0SWQpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZGVsZXRlKGBodHRwOi8vbG9jYWxob3N0OjMwMDEvY3VzdG9taXplZC1wcm9kdWN0cy8ke3Byb2R1Y3RJZH1gKTtcclxuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA+PSAyMDAgJiYgcmVzcG9uc2Uuc3RhdHVzIDwgMzAwKSB7XHJcbiAgICAgICAgdG9hc3Quc3VjY2VzcygnUHJvZHVjdCBkZWxldGVkIHN1Y2Nlc3NmdWxseScpO1xyXG4gICAgICAgIHNldEN1c3RvbWl6ZWRQcm9kdWN0cyhjdXN0b21pemVkUHJvZHVjdHMuZmlsdGVyKHByb2R1Y3QgPT4gcHJvZHVjdC5faWQgIT09IHByb2R1Y3RJZCkpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBkZWxldGluZyBwcm9kdWN0OicsIGVycm9yKTtcclxuICAgICAgdG9hc3QuZXJyb3IoJ0ZhaWxlZCB0byBkZWxldGUgcHJvZHVjdCcpO1xyXG4gICAgfVxyXG4gIH07XHJcbiBcclxuXHJcbiAgY29uc3QgY2FsY3VsYXRlVG90YWwgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gY2FydEl0ZW1zLnJlZHVjZSgodG90YWwsIGl0ZW0pID0+IHRvdGFsICsgKGl0ZW0ucHJpY2UgKiBpdGVtLnF1YW50aXR5KSwgMCk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuY29udGFpbmVyfT5cclxuICAgICAgPE5hdmJhciAvPlxyXG4gICAgICA8aDEgY2xhc3NOYW1lPXtzdHlsZXMudGl0bGV9PllvdXIgQ2FydDwvaDE+XHJcbiAgICAgIDx0YWJsZSBjbGFzc05hbWU9e3N0eWxlcy5jYXJ0VGFibGV9PlxyXG4gICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgPHRoPlByb2R1Y3QgTmFtZTwvdGg+XHJcbiAgICAgICAgICAgIDx0aD5Qcm9kdWN0IElEPC90aD5cclxuICAgICAgICAgICAgPHRoPlByaWNlPC90aD5cclxuICAgICAgICAgICAgPHRoPlR5cGU8L3RoPlxyXG4gICAgICAgICAgICA8dGg+TWF0ZXJpYWw8L3RoPlxyXG4gICAgICAgICAgICA8dGg+RGltZW5zaW9uczwvdGg+XHJcbiAgICAgICAgICAgIDx0aD5RdWFudGl0eTwvdGg+XHJcbiAgICAgICAgICAgIDx0aD5Ub3RhbDwvdGg+XHJcbiAgICAgICAgICAgIDx0aD5BY3Rpb248L3RoPlxyXG4gICAgICAgICAgPC90cj5cclxuICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgIHtjYXJ0SXRlbXMubWFwKGl0ZW0gPT4gKFxyXG4gICAgICAgICAgICA8dHIga2V5PXtpdGVtLl9pZH0+XHJcbiAgICAgICAgICAgICAgPHRkPntpdGVtLm5hbWV9PC90ZD5cclxuICAgICAgICAgICAgICA8dGQ+e2l0ZW0ucHJvZHVjdF9pZH08L3RkPlxyXG4gICAgICAgICAgICAgIDx0ZD4ke2l0ZW0ucHJpY2UudG9GaXhlZCgyKX08L3RkPlxyXG4gICAgICAgICAgICAgIDx0ZD57aXRlbS50eXBlfTwvdGQ+XHJcbiAgICAgICAgICAgICAgPHRkPntpdGVtLm1hdGVyaWFsfTwvdGQ+XHJcbiAgICAgICAgICAgICAgPHRkPntpdGVtLmRpbWVuc2lvbnN9PC90ZD5cclxuICAgICAgICAgICAgICA8dGQ+XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICB7aXRlbS5xdWFudGl0eX1cclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgIDx0ZD4keyhpdGVtLnByaWNlICogaXRlbS5xdWFudGl0eSkudG9GaXhlZCgyKX08L3RkPlxyXG4gICAgICAgICAgICAgIDx0ZD5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlUmVtb3ZlSXRlbShpdGVtLl9pZCl9XHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLnJlbW92ZUJ1dHRvbn1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgUmVtb3ZlXHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgKSl9XHJcbiAgICAgICAgPC90Ym9keT5cclxuICAgICAgPC90YWJsZT5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy50b3RhbENvbnRhaW5lcn0+XHJcbiAgICAgICAgPGgyPlRvdGFsOiAke2NhbGN1bGF0ZVRvdGFsKCkudG9GaXhlZCgyKX08L2gyPlxyXG4gICAgICAgIDxoMz5Eb3ducGF5bWVudDogJHtkb3ducGF5bWVudC50b0ZpeGVkKDIpfTwvaDM+XHJcblxyXG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtzdHlsZXMuY2hlY2tvdXRCdXR0b259PlByb2NlZWQgdG8gQ2hlY2tvdXQ8L2J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcbj0gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFlvdXJDYXJ0O1xyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsImF4aW9zIiwiTmF2YmFyIiwic3R5bGVzIiwiRm9vdGVyIiwiWW91ckNhcnQiLCJjYXJ0SXRlbXMiLCJzZXRDYXJ0SXRlbXMiLCJ0b3RhbFByaWNlIiwic2V0VG90YWxQcmljZSIsImRvd25wYXltZW50Iiwic2V0RG93bnBheW1lbnQiLCJnZXQiLCJ0aGVuIiwicmVzcG9uc2UiLCJkYXRhIiwiaXRlbXMiLCJjYXRjaCIsImVycm9yIiwiY29uc29sZSIsImhhbmRsZVF1YW50aXR5Q2hhbmdlIiwiaWQiLCJuZXdRdWFudGl0eSIsIm1hcCIsIml0ZW0iLCJfaWQiLCJxdWFudGl0eSIsImhhbmRsZVJlbW92ZUl0ZW0iLCJwcm9kdWN0SWQiLCJkZWxldGUiLCJzdGF0dXMiLCJ0b2FzdCIsInN1Y2Nlc3MiLCJzZXRDdXN0b21pemVkUHJvZHVjdHMiLCJjdXN0b21pemVkUHJvZHVjdHMiLCJmaWx0ZXIiLCJwcm9kdWN0IiwiY2FsY3VsYXRlVG90YWwiLCJyZWR1Y2UiLCJ0b3RhbCIsInByaWNlIiwiZGl2IiwiY2xhc3NOYW1lIiwiY29udGFpbmVyIiwiaDEiLCJ0aXRsZSIsInRhYmxlIiwiY2FydFRhYmxlIiwidGhlYWQiLCJ0ciIsInRoIiwidGJvZHkiLCJ0ZCIsIm5hbWUiLCJwcm9kdWN0X2lkIiwidG9GaXhlZCIsInR5cGUiLCJtYXRlcmlhbCIsImRpbWVuc2lvbnMiLCJidXR0b24iLCJvbkNsaWNrIiwicmVtb3ZlQnV0dG9uIiwidG90YWxDb250YWluZXIiLCJoMiIsImgzIiwiY2hlY2tvdXRCdXR0b24iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/YourCart/index.js\n"));

/***/ })

});