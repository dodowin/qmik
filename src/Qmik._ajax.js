/**
 * @author:leo
 * @email:cwq0312@163.com
 * @version:1.00.000
 */
(function(Q) { /* ajax */
	var win = Q.global, toObject = Q.parseJSON, isFun = Q.isFun, ac = {
		type : 'GET',
		async : !0,
		dataType : 'text'
	};
	function request() {
		return win.XMLHttpRequest && (win.location.protocol !== 'file:' || !win.ActiveXObject)	? new win.XMLHttpRequest()
																															: new win.ActiveXObject('Microsoft.XMLHTTP')
	}
	function ajax(conf) {
		var _config = Q.extend({}, ac, conf), dataType = _config.dataType, ttl = _config.timeout, //
		xhr = request(), data = _config.data, thread, success = _config.success, error = _config.error //
		;
		//_config.beforeSend && _config.beforeSend();
		xhr.onreadystatechange = function() {
			if (4 == xhr.readyState) {
				if (200 == xhr.status) {
					thread && thread.stop();
					success && success(dataType == 'xml' ? xhr.responseXML
																	: (dataType == 'json' ? toObject(xhr.responseText) : xhr.responseText))
				} else {
					error && error(xhr)
				}
			}
		};
		xhr.open(_config.type, _config.url, _config.async);
		xhr.setRequestHeader("Cache-Control", "no-cache");
		xhr.send(_config.type == "GET" ? Q.param(data) : data);
		if (ttl > 0) thread = Q.delay(function() {
			xhr.abort();
			error && error(xhr.xhr, xhr.type)
		}, ttl)
	}
	function get(url, data, success, dataType, method) {
		if (isFun(data)) {
			dataType = success;
			success = data;
			data = null
		}
		ajax({
			url : url,
			data : data,
			success : success,
			dataType : dataType,
			type : method
		})
	}
	Q.extend({
		ajax : ajax,
		get : get,
		getJSON : function(url, data, success) {
			get(url, data, success, 'json')
		},
		post : function(url, data, success, dataType) {
			get(url, data, success, dataType, "post")
		}
	})
})(Qmik);
