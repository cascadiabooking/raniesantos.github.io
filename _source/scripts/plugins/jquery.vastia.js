(function($){

	$.fn.vastia = function(options){
		var $form = this,
				errors = {},

				args = $.extend({
					rules: {},
					customFieldNames: {},
					errorClass: "error",
					start: $.noop,
					passed: function(){ $form.trigger("submit"); },
					failed: $.noop
				}, options),

				rules = args.rules,
				customFieldNames = args.customFieldNames,
				errorClass = args.errorClass,
				startCallback = args.start,
				passedCallback = args.passed,
				failedCallback = args.failed,

				messages = {
					required: "The :fieldName field is required.",
					str_min: "The :fieldName must be at least :p0 characters.",
					str_max: "The :fieldName may not be greater than :p0 characters.",
					str_between: "The :fieldName must be between :p0 and :p1 characters.",
					email: "The :fieldName must be a valid email address.",
					alpha_space: "The :fieldName may only contain letters and spaces."
				},

				splitRules = function(){
					$.each(rules, function(fieldName, rulesString){
						rules[fieldName] = rulesString.split("|");
					});
				},

				getMessage = function(ruleName){
					return messages[ruleName];
				},

				getFieldName = function(fieldName){
					return (fieldName in customFieldNames) ? customFieldNames[fieldName] : fieldName;
				},

				doReplacements = function(message, fieldName, parameters){
					message = message.replace(":fieldName", getFieldName(fieldName));

					$.each(parameters.split(","), function(key, value){
						message = message.replace(":p"+key, value);
					});

					return message;
				},

				errorsHas = function(fieldName){
					return (fieldName in errors);
				},

				addError = function(fieldName, ruleName, parameters){
					var message = getMessage(ruleName),
							message = doReplacements(message, fieldName, parameters);

					if(errorsHas(fieldName) === false){
						errors[fieldName] = [];
					}

					errors[fieldName].push(message);
				}

				method = {
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
						var reg = /^[A-Z0-9._-]+@([A-Z0-9-]+\.)+[A-Z]{2,15}$/i;
						return reg.test($.trim(value));
					},

					alpha_space: function(value, parameters){
						var reg = /^[a-zA-Z ]+$/;
						return reg.test($.trim(value));
					}
				},

				hasRule = function(fieldName, rule){
					return (fieldName in rules && rules[fieldName].indexOf(rule) > -1);
				},

				isValidatable = function(fieldName, value){
					return ( hasRule(fieldName, "required") || method.required(value, "") );
				},

				validate = function(fieldName, rule, $field){
					var ruleName = rule,
							parameters = "",
							value = $field.val();

					if(strContains(rule, ":")){
						ruleName = rule.split(":")[0];
						parameters = rule.split(":")[1];
					}

					if(isValidatable(fieldName, value) && method[ruleName](value, parameters) === false){
						addError(fieldName, ruleName, parameters);
					}
				};

		splitRules();

		$form.submit(function(e){
			e.preventDefault();

			if( $.isEmptyObject(rules) ){
				console.log("ERROR: the 'rule' option is required for the vastiajs plugin");
			}else{
				errors = {};
				$form.find("." + errorClass).remove();
				startCallback();

				setTimeout(function(){
					$.each(rules, function(fieldName, fieldRules){
						$field = $form.find('[name="' +fieldName+ '"]');

						$.each(fieldRules, function(key, rule){
							validate(fieldName, rule, $field);
						}); // loop fieldRules

						if(errorsHas(fieldName)){
							$field.after('<span class="' +errorClass+ '">' +errors[fieldName][0]+ '</span>');
						}
					}); // loop rules

					if( $.isEmptyObject(errors) ){
						passedCallback();
					}else{
						failedCallback();
					}
		    }, 500); // timeout
			} // check if rules were defined

		}); // $form submit

	}; // end plugin
}(jQuery));
