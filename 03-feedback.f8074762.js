!function(){var e={set:function(e,t){try{var o=JSON.stringify(t);o&&localStorage.setItem(e,o)}catch(o){console.log("Could not save '".concat(e,":").concat(t,"' to Local Sorage. Error:"),o)}},get:function(e){try{var t=localStorage.getItem(e);return null===t?void 0:JSON.parse(t)}catch(t){console.log("Could not retrieve '".concat(e,"' from Local Sorage. Error:"),t)}},remove:function(e){try{localStorage.removeItem(e)}catch(t){console.log("Could not remove '".concat(e,"' from Local Sorage. Error:"),t)}}},t=document.querySelector(".feedback-form"),o=e.get("feedback-form-state");o&&o.email&&(t.elements.email.value=o.email),o&&o.message&&(t.elements.message.value=o.message);t.addEventListener("input",(function(t){var o=t.currentTarget.elements.email.value,a=t.currentTarget.elements.message.value;e.set("feedback-form-state",{email:o,message:a})}));t.addEventListener("submit",(function(t){t.preventDefault(),t.currentTarget.reset(),e.get("feedback-form-state")&&(console.log(e.get("feedback-form-state")),e.remove("feedback-form-state"))}))}();
//# sourceMappingURL=03-feedback.f8074762.js.map
