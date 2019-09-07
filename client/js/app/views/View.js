"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var View;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  return {
    setters: [],
    execute: function () {
      _export("View", View = function () {
        function View(elemento) {
          _classCallCheck(this, View);

          this._elemento = elemento;
        }

        _createClass(View, [{
          key: "template",
          value: function template() {
            throw new Error('O método template deve ser implementado');
          }
        }, {
          key: "update",
          value: function update(model) {
            this._elemento.innerHTML = this.template(model);
          }
        }]);

        return View;
      }());

      _export("View", View);
    }
  };
});
//# sourceMappingURL=View.js.map