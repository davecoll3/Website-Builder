(function () {
  "use strict";

  function onReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  onReady(function () {
    var form = document.getElementById("contact-form");
    if (!form) {
      return;
    }

    var success = document.getElementById("contact-success");
    var error = document.getElementById("contact-error");
    var honeypot = form.querySelector("input[name='company']");
    var submitButton = form.querySelector("button[type='submit']");
    var defaultButtonText = submitButton ? submitButton.textContent : "Submit";
    var fields = [
      document.getElementById("full-name"),
      document.getElementById("email-address"),
      document.getElementById("message"),
    ].filter(Boolean);

    function setMessageVisible(element, isVisible) {
      if (!element) {
        return;
      }
      if (isVisible) {
        element.classList.add("is-visible");
      } else {
        element.classList.remove("is-visible");
      }
    }

    function setSubmitting(isSubmitting) {
      if (!submitButton) {
        return;
      }
      submitButton.disabled = isSubmitting;
      submitButton.textContent = isSubmitting ? "Sending..." : defaultButtonText;
    }

    function updateFieldState(field) {
      if (!field) {
        return;
      }
      if (field.checkValidity()) {
        field.classList.add("is-valid");
        field.classList.remove("is-invalid");
      } else {
        field.classList.add("is-invalid");
        field.classList.remove("is-valid");
      }
    }

    function clearValidation() {
      fields.forEach(function (field) {
        field.classList.remove("is-valid");
        field.classList.remove("is-invalid");
      });
      form.classList.remove("was-validated");
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      setMessageVisible(success, false);
      setMessageVisible(error, false);

      form.classList.add("was-validated");
      fields.forEach(updateFieldState);

      if (!form.checkValidity()) {
        return;
      }

      if (honeypot && honeypot.value) {
        form.reset();
        clearValidation();
        setMessageVisible(success, true);
        return;
      }

      setSubmitting(true);

      var formData = new FormData(form);

      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then(function (response) {
          return response
            .json()
            .catch(function () {
              return {};
            })
            .then(function (data) {
              return {
                ok: response.ok,
                data: data,
              };
            });
        })
        .then(function (result) {
          if (result.ok) {
            form.reset();
            clearValidation();
            setMessageVisible(success, true);
          } else {
            setMessageVisible(error, true);
          }
        })
        .catch(function () {
          setMessageVisible(error, true);
        })
        .finally(function () {
          setSubmitting(false);
        });
    });
  });
})();
