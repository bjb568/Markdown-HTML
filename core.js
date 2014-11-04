String.prototype.replaceAll = function(find, replace) {
	if (typeof find == 'string') return this.split(find).join(replace);
	var t = this, i, j;
	while (typeof(i = find.shift()) == 'string' && typeof(j = replace.shift()) == 'string') t = t.replaceAll(i || '', j || '');
	return t;
};
function html(input) {
	return input.toString().replaceAll(['&', '<', '"'], ['&amp;', '&lt;', '&quot;']);
};
function inlineMarkdown(input) {
	var backslash = Math.random().toString();
	while (input.indexOf(backslash) != -1) backslash = Math.random().toString();
	input = input.replaceAll('\\\\', backslash);
	var graveaccent = Math.random().toString();
	while (input.indexOf(graveaccent) != -1 || [backslash].indexOf(graveaccent) != -1) graveaccent = Math.random().toString();
	input = input.replaceAll('\\`', graveaccent);
	var asterisk = Math.random().toString();
	while (input.indexOf(asterisk) != -1 || [backslash, graveaccent].indexOf(asterisk) != -1) asterisk = Math.random().toString();
	input = input.replaceAll('\\*', asterisk);
	var underscore = Math.random().toString();
	while (input.indexOf(underscore) != -1 || [backslash, graveaccent, asterisk].indexOf(underscore) != -1) underscore = Math.random().toString();
	input = input.replaceAll('\\_', underscore);
	var dash = Math.random().toString();
	while (input.indexOf(dash) != -1 || [backslash, graveaccent, asterisk, underscore].indexOf(dash) != -1) dash = Math.random().toString();
	input = input.replaceAll('\\-', dash);
	var plus = Math.random().toString();
	while (input.indexOf(plus) != -1 || [backslash, graveaccent, asterisk, underscore, dash].indexOf(plus) != -1) plus = Math.random().toString();
	input = input.replaceAll('\\+', plus);
	var dot = Math.random().toString();
	while (input.indexOf(dot) != -1 || [backslash, graveaccent, asterisk, underscore, dash, plus].indexOf(dot) != -1) dot = Math.random().toString();
	input = input.replaceAll('\\.', dot);
	var gt = Math.random().toString();
	while (input.indexOf(gt) != -1 || [backslash, graveaccent, asterisk, underscore, dash, plus, dot].indexOf(gt) != -1) gt = Math.random().toString();
	input = input.replaceAll('\\>', gt);
	var paren = '#' + Math.random().toString();
	while (input.indexOf(paren) != -1) paren = '#' + Math.random().toString();
	input = input.replaceAll('\\(', paren);
	var cparen = '#' + Math.random().toString();
	while (input.indexOf(cparen) != -1 || [paren].indexOf(cparen) != -1) cparen = '#' + Math.random().toString();
	input = input.replaceAll('\\)', cparen);
	var carrot = '#' + Math.random().toString();
	while (input.indexOf(carrot) != -1 || [paren, cparen].indexOf(carrot) != -1) carrot = '#' + Math.random().toString();
	input = input.replaceAll('\\^', carrot);
	var dollar = '#' + Math.random().toString();
	while (input.indexOf(dollar) != -1 || [paren, cparen, carrot].indexOf(dollar) != -1) dollar = '#' + Math.random().toString();
	input = input.replaceAll('\\$', dollar);
	var open = [];
	return input.split('`').map(function(val, i, arr) {
		if (i % 2) return '<code>' + html(val.replaceAll([backslash, graveaccent, asterisk, underscore, dash, plus, dot, gt, paren, cparen, carrot, dollar], ['\\\\', '\\`', '\\*', '\\_', '\\-', '\\+', '\\.', '\\>', '\\(', '\\)', '\\^'])) + '</code>';
		var parsed = val.split('*').map(function(val, i, arr) {
			var parsed = val.split('_').map(function(val, i, arr) {
				var parsed = val.split('---').map(function(val, i, arr) {
					var parsed = val.split('+++').map(function(val, i, arr) {
						var parsed = html(val.replaceAll([backslash, graveaccent, asterisk, underscore, dash, plus, dot, gt], ['\\', '`', '*', '_', '-', '+', '.', '>']))
							.replace(/!\[([^\]]+)]\(([^\s("]+\.[^\s()"]+)\)/g, '<img alt="$1" src="$2" />')
							.replace(/\[([^\]]+)]\((https?:\/\/[^\s("]+\.[^\s()"]+)\)/g, '$1'.link('$2'))
							.replace(/([^;["])(https?:\/\/([^\s("]+\.[^\s()"]+))/g, '$1' + '$3'.link('$2'))
							.replace(/^(https?:\/\/([^\s("]+\.[^\s()"]+))/g, '$2'.link('$1'))
							.replace(/\^(\w+)/g, '<sup>$1</sup>');
						if (i % 2) {
							var p = open.indexOf('</ins>')
							if (p != -1) {
								open.splice(p, 1);
								return '</ins>' + parsed;
							} else if (arr[i + 1] === undefined) {
								open.push('</ins>');
								return '<ins>' + parsed;
							}
						}
						return i % 2 ? '<ins>' + parsed + '</ins>' : parsed;
					}).join('');
					if (i % 2) {
						var p = open.indexOf('</del>');
						if (p != -1) {
							open.splice(p, 1);
							return '</del>' + parsed;
						} else if (arr[i + 1] === undefined) {
							open.push('</del>');
							return '<del>' + parsed;
						}
					}
					return i % 2 ? '<del>' + parsed + '</del>' : parsed;
				}).join('');
				if (i % 2) {
					var p = open.indexOf('</strong>');
					if (p != -1) {
						open.splice(p, 1);
						return '</strong>' + parsed;
					} else if (arr[i + 1] === undefined) {
						open.push('</strong>');
						return '<strong>' + parsed;
					}
				}
				return i % 2 ? '<strong>' + parsed + '</strong>' : parsed;
			}).join('');
			if (i % 2) {
				var p = open.indexOf('</em>');
				if (p != -1) {
					open.splice(p, 1);
					return '</em>' + parsed;
				} else if (arr[i + 1] === undefined) {
					open.push('</em>');
					return '<em>' + parsed;
				}
			}
			return i % 2 ? '<em>' + parsed + '</em>' : parsed;
		}).join('');
		return parsed.replace(/\^\(([^)]+)\)/g, '<sup>$1</sup>').replace(/\$\(([^)]+)\)/g, '<sub>$1</sub>').replaceAll([paren, cparen, carrot, dollar], ['(', ')', '^', '$']);
	}).join('') + open.join('');
};
function markdown(input) {
	if (input.indexOf('\n') == -1 && input.substr(0, 2) != '> ' && input.substr(0, 2) != '- ' && input.substr(0, 2) != '* ' && input.substr(0, 4) != '    ' && input[0] != '\t' && !input.match(/^(\w[.)]|#{1,6}) /)) return inlineMarkdown(input);
	var blockquote = '',
		ul = '',
		ol = '',
		li = '',
		code = '';
	return input.split('\n').map(function(val, i, arr) {
		if (!val) return '';
		if (val.substr(0, 2) == '> ') {
			val = val.substr(2);
			if (arr[i + 1] && arr[i + 1].substr(0, 2) == '> ') {
				blockquote += val + '\n';
				return '';
			} else {
				var arg = blockquote + val;
				blockquote = '';
				return '<blockquote>' + markdown(arg) + '</blockquote>';
			}
		} else if (val.substr(0, 2) == '- ' || val.substr(0, 2) == '* ') {
			if (!ul) ul = '<ul>';
			val = val.substr(2);
			if (li) {
				ul += '<li>' + markdown(li) + '</li>';
				li = '';
			};
			if (arr[i + 1] && (arr[i + 1].substr(0, 2) == '- ' || arr[i + 1] && arr[i + 1].substr(0, 2) == '* ')) {
				ul += '<li>' + inlineMarkdown(val) + '</li>';
				return '';
			} else if (arr[i + 1] && (arr[i + 1][0] == '\t' || arr[i + 1] && arr[i + 1].substr(0, 4) == '    ')) {
				li += val + '\n';
				return '';
			} else {
				var arg = ul + '<li>' + markdown(val) + '</li>';
				ul = '';
				return arg + '</ul>';
			}
		} else if (val.match(/^\w[.)] /)) {
			if (!ol) ol = '<ol>';
			val = val.substr(3);
			if (li) {
				ol += '<li>' + markdown(li) + '</li>';
				li = '';
			};
			if (arr[i + 1] && arr[i + 1].match(/^\w[.)] /)) {
				ol += '<li>' + inlineMarkdown(val) + '</li>';
				return '';
			} else if (arr[i + 1] && (arr[i + 1][0] == '\t' || arr[i + 1] && arr[i + 1].substr(0, 4) == '    ')) {
				li += val + '\n';
				return '';
			} else {
				var arg = ol + '<li>' + inlineMarkdown(val) + '</li>';
				ol = '';
				return arg + '</ol>';
			}
		} else if (li && val[0] == '\t') {
			li += val.substr(1) + '\n';
			if (ul && (!arr[i + 1] || (arr[i + 1][0] != '\t' && arr[i + 1].substr(0, 4) != '    ' && arr[i + 1].substr(2) != '- ' && arr[i + 1].substr(2) != '* '))) {
				var arg = ul + '<li>' + markdown(li) + '</li>';
				li = '';
				return arg + '</ul>';
			} else if (ol && (!arr[i + 1] || (arr[i + 1][0] != '\t' && arr[i + 1].substr(0, 4) != '    ' && !arr[i + 1].match(/^\w[.)] /)))) {
				var arg = ol + '<li>' + markdown(li) + '</li>';
				li = '';
				return arg + '</ol>';
			}
			return '';
		} else if (li && val.substr(0, 4) == '    ') {
			li += val.substr(4) + '\n';
			if (ul && (!arr[i + 1] || (arr[i + 1][0] != '\t' && arr[i + 1].substr(0, 4) != '    ' && arr[i + 1].substr(2) != '- ' && arr[i + 1].substr(2) != '* '))) {
				var arg = ul + '<li>' + markdown(li) + '</li>';
				li = '';
				return arg + '</ul>';
			} else if (ol && (!arr[i + 1] || (arr[i + 1][0] != '\t' && arr[i + 1].substr(0, 4) != '    ' && !arr[i + 1].match(/^\w[.)] /)))) {
				var arg = ol + '<li>' + markdown(li) + '</li>';
				li = '';
				return arg + '</ol>';
			}
			return '';
		} else if (val[0] == '\t') {
			code += val.substr(1);
			if (!arr[i + 1] || (arr[i + 1].substr(0, 4) != '    ' && arr[i + 1][0] != '\t')) {
				var arg = html(code);
				code = '';
				return '<code class="blk">' + arg + '</code>';
			} else code += '\n';
			return '';
		} else if (val.substr(0, 4) == '    ') {
			code += val.substr(4);
			if (!arr[i + 1] || (arr[i + 1].substr(0, 4) != '    ' && arr[i + 1][0] != '\t')) {
				var arg = html(code);
				code = '';
				return '<code class="blk">' + arg + '</code>';
			} else code += '\n';
			return '';
		} else if ((i = val.match(/^#{1,6} /)) && (i = i[0].length - 1)) {
			return '<h' + i + '>' + inlineMarkdown(val.substr(i + 1)) + '</h' + i + '>';
		} else return '<p>' + inlineMarkdown(val) + '</p>';
	}).join('');
};