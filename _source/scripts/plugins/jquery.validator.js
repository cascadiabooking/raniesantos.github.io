(function($){

	$.fn.validator = function(args){
		var $form = this,
				rules = args.rules,
				passedCallback = args.passed,
				failedCallback = args.failed,
				errors = {},

				messages = {
					required: "The :fieldName field is required.",
					str_min: "The :fieldName must be at least :p0 characters.",
					str_max: "The :fieldName may not be greater than :p0 characters.",
					str_between: "The :fieldName must be between :p0 and :p1 characters.",
					email: "The :fieldName must be a valid email address.",
					alpha_space: "The :fieldName may only contain letters and spaces."
				},

				getMessage = function(ruleName){
					return messages[ruleName];
				},

				doReplacements = function(message, fieldName, parameters){
					// if alias exists, set fieldName = alias
					message = message.replace(":fieldName", fieldName);

					$.each(parameters.split(","), function(key, value){
						message = message.replace(":p"+key, value);
					});

					return message;
				},

				addError = function(fieldName, ruleName, parameters){
					var message = getMessage(ruleName),
							message = doReplacements(message, fieldName, parameters);

					if( !(fieldName in errors) ){
						errors[fieldName] = [];
					}

					errors[fieldName].push(message);
				}

				check = {
					required: function(value, parameters){
						return ($.trim(value) !== "");
					},

					str_min: function(value, parameters){
						return ($.trim(value).length >= parameters);
					},

					str_max: function(value, parameters){
						return ($.trim(value).length <= parameters);
					},

					str_between: function(value, parameters){
						var min = parameters.split(",")[0],
								max = parameters.split(",")[1],
								strlen = $.trim(value).length;
						return (strlen >= min && strlen <= max);
					},

					email: function(value, parameters){
						// this function is empty
						return true;
					},

					alpha_space: function(value, parameters){
						var	match = $.trim(value).match(/^[a-zA-Z ]+$/);
						return (match !== null);
					}
				},

				validate = function(fieldName, rule){
					var ruleName = rule,
							parameters = "",
							value = $form.find("[name='" +fieldName+ "']").val();

					if(strContains(rule, ":")){
						ruleName = rule.split(":")[0];
						parameters = rule.split(":")[1];
					}

					if(check[ruleName](value, parameters) === false){
						addError(fieldName, ruleName, parameters);
					}
				};

		$form.submit(function(e){
			e.preventDefault();
			errors = {};

			$.each(rules, function(fieldName, fieldRules){
				$.each(fieldRules.split("|"), function(key, rule){
					validate(fieldName, rule);
				}); // loop fieldRules
			}); // loop rules

			console.log(errors);
			if( $.isEmptyObject(errors) ){
				passedCallback();
			}else{
				failedCallback();
			}

		}); // $form submit

	}; // end plugin
}(jQuery));
