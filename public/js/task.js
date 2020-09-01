/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/task.js":
/*!******************************!*\
  !*** ./resources/js/task.js ***!
  \******************************/
/*! exports provided: taskIndex, taskShow, taskStore, taskUpdate, taskDelete */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "taskIndex", function() { return taskIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "taskShow", function() { return taskShow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "taskStore", function() { return taskStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "taskUpdate", function() { return taskUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "taskDelete", function() { return taskDelete; });
var host = 'http://localhost:8000';

function errorFormatter(response) {
  if (response.message !== undefined) {
    return {
      code: response.status,
      message: response.message
    };
  } else {
    return {
      code: response.status,
      message: 'unknown error.'
    };
  }
}

function taskIndex() {
  return fetch(host + '/api/task').then(function (response) {
    return response.json();
  }).then(function (json) {
    return json.data;
  })["catch"](function (response) {
    return errorFormatter(response);
  });
}

function taskShow(id) {
  return fetch(host + '/api/task/' + id, {
    headers: {
      'Accept': 'application/json'
    },
    method: 'GET'
  }).then(function (response) {
    return response.json();
  }).then(function (json) {
    return json.data;
  })["catch"](function (response) {
    return errorFormatter(response);
  });
}

function taskStore(title, content) {
  return fetch(host + '/api/task', {
    headers: {
      'Accept': 'application/json',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      'title': title,
      'content': content
    }),
    method: 'POST'
  }).then(function (response) {
    return response.json();
  }).then(function (json) {
    return json.data;
  })["catch"](function (response) {
    return errorFormatter(response);
  });
}

function taskUpdate(id, title, content) {
  return fetch(host + '/api/task/' + id, {
    headers: {
      'Accept': 'application/json',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      'title': title,
      'content': content
    }),
    method: 'PATCH'
  }).then(function (response) {
    return response.json();
  }).then(function (json) {
    return json.data;
  })["catch"](function (response) {
    return errorFormatter(response);
  });
}

function taskDelete(id) {
  return fetch(host + '/api/task/' + id, {
    headers: {
      'Accept': 'application/json',
      'content-type': 'application/json'
    },
    method: 'DELETE'
  });
}



/***/ }),

/***/ 1:
/*!************************************!*\
  !*** multi ./resources/js/task.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/ernie/Documents/專案/laravel_simple_todolist/resources/js/task.js */"./resources/js/task.js");


/***/ })

/******/ });