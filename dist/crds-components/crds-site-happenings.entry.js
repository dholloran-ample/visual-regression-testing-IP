import { h, r as registerInstance, c as getElement } from './chunk-67523e50.js';
import { g as gql, C as CrdsApollo } from './chunk-3601aa65.js';
import { c as createCommonjsModule, a as commonjsGlobal } from './chunk-a9955f90.js';
import './chunk-950a1dca.js';
import { U as Utils } from './chunk-4786bf9d.js';

var marked = createCommonjsModule(function (module, exports) {
/**
 * marked - a markdown parser
 * Copyright (c) 2011-2018, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */

;(function(root) {
'use strict';

/**
 * Block-Level Grammar
 */

var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: /^ {0,3}(`{3,}|~{3,})([^`~\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
  hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
  heading: /^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: '^ {0,3}(?:' // optional indentation
    + '<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)' // (1)
    + '|comment[^\\n]*(\\n+|$)' // (2)
    + '|<\\?[\\s\\S]*?\\?>\\n*' // (3)
    + '|<![A-Z][\\s\\S]*?>\\n*' // (4)
    + '|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*' // (5)
    + '|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)' // (6)
    + '|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)' // (7) open tag
    + '|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)' // (7) closing tag
    + ')',
  def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
  nptable: noop,
  table: noop,
  lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
  // regex template, placeholders will be replaced according to different paragraph
  // interruption rules of commonmark and the original markdown spec:
  _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,
  text: /^[^\n]+/
};

block._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
block.def = edit(block.def)
  .replace('label', block._label)
  .replace('title', block._title)
  .getRegex();

block.bullet = /(?:[*+-]|\d{1,9}\.)/;
block.item = /^( *)(bull) ?[^\n]*(?:\n(?!\1bull ?)[^\n]*)*/;
block.item = edit(block.item, 'gm')
  .replace(/bull/g, block.bullet)
  .getRegex();

block.list = edit(block.list)
  .replace(/bull/g, block.bullet)
  .replace('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))')
  .replace('def', '\\n+(?=' + block.def.source + ')')
  .getRegex();

block._tag = 'address|article|aside|base|basefont|blockquote|body|caption'
  + '|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption'
  + '|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe'
  + '|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option'
  + '|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr'
  + '|track|ul';
block._comment = /<!--(?!-?>)[\s\S]*?-->/;
block.html = edit(block.html, 'i')
  .replace('comment', block._comment)
  .replace('tag', block._tag)
  .replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/)
  .getRegex();

block.paragraph = edit(block._paragraph)
  .replace('hr', block.hr)
  .replace('heading', ' {0,3}#{1,6} +')
  .replace('|lheading', '') // setex headings don't interrupt commonmark paragraphs
  .replace('blockquote', ' {0,3}>')
  .replace('fences', ' {0,3}(?:`{3,}|~{3,})[^`\\n]*\\n')
  .replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
  .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)')
  .replace('tag', block._tag) // pars can be interrupted by type (6) html blocks
  .getRegex();

block.blockquote = edit(block.blockquote)
  .replace('paragraph', block.paragraph)
  .getRegex();

/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  nptable: /^ *([^|\n ].*\|.*)\n *([-:]+ *\|[-| :]*)(?:\n((?:.*[^>\n ].*(?:\n|$))*)\n*|$)/,
  table: /^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/
});

/**
 * Pedantic grammar (original John Gruber's loose markdown specification)
 */

block.pedantic = merge({}, block.normal, {
  html: edit(
    '^ *(?:comment *(?:\\n|\\s*$)'
    + '|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)' // closed tag
    + '|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))')
    .replace('comment', block._comment)
    .replace(/tag/g, '(?!(?:'
      + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub'
      + '|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)'
      + '\\b)\\w+(?!:|[^\\w\\s@]*@)\\b')
    .getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
  fences: noop, // fences not supported
  paragraph: edit(block.normal._paragraph)
    .replace('hr', block.hr)
    .replace('heading', ' *#{1,6} *[^\n]')
    .replace('lheading', block.lheading)
    .replace('blockquote', ' {0,3}>')
    .replace('|fences', '')
    .replace('|list', '')
    .replace('|html', '')
    .getRegex()
});

/**
 * Block Lexer
 */

function Lexer(options) {
  this.tokens = [];
  this.tokens.links = Object.create(null);
  this.options = options || marked.defaults;
  this.rules = block.normal;

  if (this.options.pedantic) {
    this.rules = block.pedantic;
  } else if (this.options.gfm) {
    this.rules = block.gfm;
  }
}

/**
 * Expose Block Rules
 */

Lexer.rules = block;

/**
 * Static Lex Method
 */

Lexer.lex = function(src, options) {
  var lexer = new Lexer(options);
  return lexer.lex(src);
};

/**
 * Preprocessing
 */

Lexer.prototype.lex = function(src) {
  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');

  return this.token(src, true);
};

/**
 * Lexing
 */

Lexer.prototype.token = function(src, top) {
  src = src.replace(/^ +$/gm, '');
  var next,
      loose,
      cap,
      bull,
      b,
      item,
      listStart,
      listItems,
      t,
      space,
      i,
      tag,
      l,
      isordered,
      istask,
      ischecked;

  while (src) {
    // newline
    if (cap = this.rules.newline.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[0].length > 1) {
        this.tokens.push({
          type: 'space'
        });
      }
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      var lastToken = this.tokens[this.tokens.length - 1];
      src = src.substring(cap[0].length);
      // An indented code block cannot interrupt a paragraph.
      if (lastToken && lastToken.type === 'paragraph') {
        lastToken.text += '\n' + cap[0].trimRight();
      } else {
        cap = cap[0].replace(/^ {4}/gm, '');
        this.tokens.push({
          type: 'code',
          codeBlockStyle: 'indented',
          text: !this.options.pedantic
            ? rtrim(cap, '\n')
            : cap
        });
      }
      continue;
    }

    // fences
    if (cap = this.rules.fences.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'code',
        lang: cap[2] ? cap[2].trim() : cap[2],
        text: cap[3] || ''
      });
      continue;
    }

    // heading
    if (cap = this.rules.heading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[1].length,
        text: cap[2]
      });
      continue;
    }

    // table no leading pipe (gfm)
    if (cap = this.rules.nptable.exec(src)) {
      item = {
        type: 'table',
        header: splitCells(cap[1].replace(/^ *| *\| *$/g, '')),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : []
      };

      if (item.header.length === item.align.length) {
        src = src.substring(cap[0].length);

        for (i = 0; i < item.align.length; i++) {
          if (/^ *-+: *$/.test(item.align[i])) {
            item.align[i] = 'right';
          } else if (/^ *:-+: *$/.test(item.align[i])) {
            item.align[i] = 'center';
          } else if (/^ *:-+ *$/.test(item.align[i])) {
            item.align[i] = 'left';
          } else {
            item.align[i] = null;
          }
        }

        for (i = 0; i < item.cells.length; i++) {
          item.cells[i] = splitCells(item.cells[i], item.header.length);
        }

        this.tokens.push(item);

        continue;
      }
    }

    // hr
    if (cap = this.rules.hr.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'hr'
      });
      continue;
    }

    // blockquote
    if (cap = this.rules.blockquote.exec(src)) {
      src = src.substring(cap[0].length);

      this.tokens.push({
        type: 'blockquote_start'
      });

      cap = cap[0].replace(/^ *> ?/gm, '');

      // Pass `top` to keep the current
      // "toplevel" state. This is exactly
      // how markdown.pl works.
      this.token(cap, top);

      this.tokens.push({
        type: 'blockquote_end'
      });

      continue;
    }

    // list
    if (cap = this.rules.list.exec(src)) {
      src = src.substring(cap[0].length);
      bull = cap[2];
      isordered = bull.length > 1;

      listStart = {
        type: 'list_start',
        ordered: isordered,
        start: isordered ? +bull : '',
        loose: false
      };

      this.tokens.push(listStart);

      // Get each top-level item.
      cap = cap[0].match(this.rules.item);

      listItems = [];
      next = false;
      l = cap.length;
      i = 0;

      for (; i < l; i++) {
        item = cap[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) */, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether the next list item belongs here.
        // Backpedal if it does not belong in this list.
        if (i !== l - 1) {
          b = block.bullet.exec(cap[i + 1])[0];
          if (bull.length > 1 ? b.length === 1
            : (b.length > 1 || (this.options.smartLists && b !== bull))) {
            src = cap.slice(i + 1).join('\n') + src;
            i = l - 1;
          }
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item.charAt(item.length - 1) === '\n';
          if (!loose) loose = next;
        }

        if (loose) {
          listStart.loose = true;
        }

        // Check for task list items
        istask = /^\[[ xX]\] /.test(item);
        ischecked = undefined;
        if (istask) {
          ischecked = item[1] !== ' ';
          item = item.replace(/^\[[ xX]\] +/, '');
        }

        t = {
          type: 'list_item_start',
          task: istask,
          checked: ischecked,
          loose: loose
        };

        listItems.push(t);
        this.tokens.push(t);

        // Recurse.
        this.token(item, false);

        this.tokens.push({
          type: 'list_item_end'
        });
      }

      if (listStart.loose) {
        l = listItems.length;
        i = 0;
        for (; i < l; i++) {
          listItems[i].loose = true;
        }
      }

      this.tokens.push({
        type: 'list_end'
      });

      continue;
    }

    // html
    if (cap = this.rules.html.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: this.options.sanitize
          ? 'paragraph'
          : 'html',
        pre: !this.options.sanitizer
          && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
        text: this.options.sanitize ? (this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0])) : cap[0]
      });
      continue;
    }

    // def
    if (top && (cap = this.rules.def.exec(src))) {
      src = src.substring(cap[0].length);
      if (cap[3]) cap[3] = cap[3].substring(1, cap[3].length - 1);
      tag = cap[1].toLowerCase().replace(/\s+/g, ' ');
      if (!this.tokens.links[tag]) {
        this.tokens.links[tag] = {
          href: cap[2],
          title: cap[3]
        };
      }
      continue;
    }

    // table (gfm)
    if (cap = this.rules.table.exec(src)) {
      item = {
        type: 'table',
        header: splitCells(cap[1].replace(/^ *| *\| *$/g, '')),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : []
      };

      if (item.header.length === item.align.length) {
        src = src.substring(cap[0].length);

        for (i = 0; i < item.align.length; i++) {
          if (/^ *-+: *$/.test(item.align[i])) {
            item.align[i] = 'right';
          } else if (/^ *:-+: *$/.test(item.align[i])) {
            item.align[i] = 'center';
          } else if (/^ *:-+ *$/.test(item.align[i])) {
            item.align[i] = 'left';
          } else {
            item.align[i] = null;
          }
        }

        for (i = 0; i < item.cells.length; i++) {
          item.cells[i] = splitCells(
            item.cells[i].replace(/^ *\| *| *\| *$/g, ''),
            item.header.length);
        }

        this.tokens.push(item);

        continue;
      }
    }

    // lheading
    if (cap = this.rules.lheading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[2].charAt(0) === '=' ? 1 : 2,
        text: cap[1]
      });
      continue;
    }

    // top-level paragraph
    if (top && (cap = this.rules.paragraph.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'paragraph',
        text: cap[1].charAt(cap[1].length - 1) === '\n'
          ? cap[1].slice(0, -1)
          : cap[1]
      });
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      // Top-level should never reach here.
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }

    if (src) {
      throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return this.tokens;
};

/**
 * Inline-Level Grammar
 */

var inline = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: noop,
  tag: '^comment'
    + '|^</[a-zA-Z][\\w:-]*\\s*>' // self-closing tag
    + '|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>' // open tag
    + '|^<\\?[\\s\\S]*?\\?>' // processing instruction, e.g. <?php ?>
    + '|^<![a-zA-Z]+\\s[\\s\\S]*?>' // declaration, e.g. <!DOCTYPE html>
    + '|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>', // CDATA section
  link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
  nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
  strong: /^__([^\s_])__(?!_)|^\*\*([^\s*])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,
  em: /^_([^\s_])_(?!_)|^\*([^\s*<\[])\*(?!\*)|^_([^\s<][\s\S]*?[^\s_])_(?!_|[^\spunctuation])|^_([^\s_<][\s\S]*?[^\s])_(?!_|[^\spunctuation])|^\*([^\s<"][\s\S]*?[^\s\*])\*(?!\*|[^\spunctuation])|^\*([^\s*"<\[][\s\S]*?[^\s])\*(?!\*)/,
  code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br: /^( {2,}|\\)\n(?!\s*$)/,
  del: noop,
  text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n))|(?= {2,}\n))/
};

// list of punctuation marks from common mark spec
// without ` and ] to workaround Rule 17 (inline code blocks/links)
inline._punctuation = '!"#$%&\'()*+,\\-./:;<=>?@\\[^_{|}~';
inline.em = edit(inline.em).replace(/punctuation/g, inline._punctuation).getRegex();

inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;

inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
inline.autolink = edit(inline.autolink)
  .replace('scheme', inline._scheme)
  .replace('email', inline._email)
  .getRegex();

inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;

inline.tag = edit(inline.tag)
  .replace('comment', block._comment)
  .replace('attribute', inline._attribute)
  .getRegex();

inline._label = /(?:\[[^\[\]]*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
inline._href = /<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*/;
inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;

inline.link = edit(inline.link)
  .replace('label', inline._label)
  .replace('href', inline._href)
  .replace('title', inline._title)
  .getRegex();

inline.reflink = edit(inline.reflink)
  .replace('label', inline._label)
  .getRegex();

/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,
  link: edit(/^!?\[(label)\]\((.*?)\)/)
    .replace('label', inline._label)
    .getRegex(),
  reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/)
    .replace('label', inline._label)
    .getRegex()
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: edit(inline.escape).replace('])', '~|])').getRegex(),
  _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
  url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
  _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
  del: /^~+(?=\S)([\s\S]*?\S)~+/,
  text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?= {2,}\n|[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/
});

inline.gfm.url = edit(inline.gfm.url, 'i')
  .replace('email', inline.gfm._extended_email)
  .getRegex();
/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: edit(inline.br).replace('{2,}', '*').getRegex(),
  text: edit(inline.gfm.text)
    .replace('\\b_', '\\b_| {2,}\\n')
    .replace(/\{2,\}/g, '*')
    .getRegex()
});

/**
 * Inline Lexer & Compiler
 */

function InlineLexer(links, options) {
  this.options = options || marked.defaults;
  this.links = links;
  this.rules = inline.normal;
  this.renderer = this.options.renderer || new Renderer();
  this.renderer.options = this.options;

  if (!this.links) {
    throw new Error('Tokens array requires a `links` property.');
  }

  if (this.options.pedantic) {
    this.rules = inline.pedantic;
  } else if (this.options.gfm) {
    if (this.options.breaks) {
      this.rules = inline.breaks;
    } else {
      this.rules = inline.gfm;
    }
  }
}

/**
 * Expose Inline Rules
 */

InlineLexer.rules = inline;

/**
 * Static Lexing/Compiling Method
 */

InlineLexer.output = function(src, links, options) {
  var inline = new InlineLexer(links, options);
  return inline.output(src);
};

/**
 * Lexing/Compiling
 */

InlineLexer.prototype.output = function(src) {
  var out = '',
      link,
      text,
      href,
      title,
      cap,
      prevCapZero;

  while (src) {
    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += escape(cap[1]);
      continue;
    }

    // tag
    if (cap = this.rules.tag.exec(src)) {
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      if (!this.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.inRawBlock = true;
      } else if (this.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.inRawBlock = false;
      }

      src = src.substring(cap[0].length);
      out += this.options.sanitize
        ? this.options.sanitizer
          ? this.options.sanitizer(cap[0])
          : escape(cap[0])
        : cap[0];
      continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      var lastParenIndex = findClosingBracket(cap[2], '()');
      if (lastParenIndex > -1) {
        var linkLen = 4 + cap[1].length + lastParenIndex;
        cap[2] = cap[2].substring(0, lastParenIndex);
        cap[0] = cap[0].substring(0, linkLen).trim();
        cap[3] = '';
      }
      src = src.substring(cap[0].length);
      this.inLink = true;
      href = cap[2];
      if (this.options.pedantic) {
        link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);

        if (link) {
          href = link[1];
          title = link[3];
        } else {
          title = '';
        }
      } else {
        title = cap[3] ? cap[3].slice(1, -1) : '';
      }
      href = href.trim().replace(/^<([\s\S]*)>$/, '$1');
      out += this.outputLink(cap, {
        href: InlineLexer.escapes(href),
        title: InlineLexer.escapes(title)
      });
      this.inLink = false;
      continue;
    }

    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0].charAt(0);
        src = cap[0].substring(1) + src;
        continue;
      }
      this.inLink = true;
      out += this.outputLink(cap, link);
      this.inLink = false;
      continue;
    }

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.strong(this.output(cap[4] || cap[3] || cap[2] || cap[1]));
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.em(this.output(cap[6] || cap[5] || cap[4] || cap[3] || cap[2] || cap[1]));
      continue;
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.codespan(escape(cap[2].trim(), true));
      continue;
    }

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.br();
      continue;
    }

    // del (gfm)
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.del(this.output(cap[1]));
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = escape(this.mangle(cap[1]));
        href = 'mailto:' + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out += this.renderer.link(href, null, text);
      continue;
    }

    // url (gfm)
    if (!this.inLink && (cap = this.rules.url.exec(src))) {
      if (cap[2] === '@') {
        text = escape(cap[0]);
        href = 'mailto:' + text;
      } else {
        // do extended autolink path validation
        do {
          prevCapZero = cap[0];
          cap[0] = this.rules._backpedal.exec(cap[0])[0];
        } while (prevCapZero !== cap[0]);
        text = escape(cap[0]);
        if (cap[1] === 'www.') {
          href = 'http://' + text;
        } else {
          href = text;
        }
      }
      src = src.substring(cap[0].length);
      out += this.renderer.link(href, null, text);
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      if (this.inRawBlock) {
        out += this.renderer.text(this.options.sanitize ? (this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0])) : cap[0]);
      } else {
        out += this.renderer.text(escape(this.smartypants(cap[0])));
      }
      continue;
    }

    if (src) {
      throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return out;
};

InlineLexer.escapes = function(text) {
  return text ? text.replace(InlineLexer.rules._escapes, '$1') : text;
};

/**
 * Compile Link
 */

InlineLexer.prototype.outputLink = function(cap, link) {
  var href = link.href,
      title = link.title ? escape(link.title) : null;

  return cap[0].charAt(0) !== '!'
    ? this.renderer.link(href, title, this.output(cap[1]))
    : this.renderer.image(href, title, escape(cap[1]));
};

/**
 * Smartypants Transformations
 */

InlineLexer.prototype.smartypants = function(text) {
  if (!this.options.smartypants) return text;
  return text
    // em-dashes
    .replace(/---/g, '\u2014')
    // en-dashes
    .replace(/--/g, '\u2013')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
    // closing doubles
    .replace(/"/g, '\u201d')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
};

/**
 * Mangle Links
 */

InlineLexer.prototype.mangle = function(text) {
  if (!this.options.mangle) return text;
  var out = '',
      l = text.length,
      i = 0,
      ch;

  for (; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
};

/**
 * Renderer
 */

function Renderer(options) {
  this.options = options || marked.defaults;
}

Renderer.prototype.code = function(code, infostring, escaped) {
  var lang = (infostring || '').match(/\S*/)[0];
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre><code>'
      + (escaped ? code : escape(code, true))
      + '</code></pre>';
  }

  return '<pre><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '</code></pre>\n';
};

Renderer.prototype.blockquote = function(quote) {
  return '<blockquote>\n' + quote + '</blockquote>\n';
};

Renderer.prototype.html = function(html) {
  return html;
};

Renderer.prototype.heading = function(text, level, raw, slugger) {
  if (this.options.headerIds) {
    return '<h'
      + level
      + ' id="'
      + this.options.headerPrefix
      + slugger.slug(raw)
      + '">'
      + text
      + '</h'
      + level
      + '>\n';
  }
  // ignore IDs
  return '<h' + level + '>' + text + '</h' + level + '>\n';
};

Renderer.prototype.hr = function() {
  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
};

Renderer.prototype.list = function(body, ordered, start) {
  var type = ordered ? 'ol' : 'ul',
      startatt = (ordered && start !== 1) ? (' start="' + start + '"') : '';
  return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
};

Renderer.prototype.listitem = function(text) {
  return '<li>' + text + '</li>\n';
};

Renderer.prototype.checkbox = function(checked) {
  return '<input '
    + (checked ? 'checked="" ' : '')
    + 'disabled="" type="checkbox"'
    + (this.options.xhtml ? ' /' : '')
    + '> ';
};

Renderer.prototype.paragraph = function(text) {
  return '<p>' + text + '</p>\n';
};

Renderer.prototype.table = function(header, body) {
  if (body) body = '<tbody>' + body + '</tbody>';

  return '<table>\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + body
    + '</table>\n';
};

Renderer.prototype.tablerow = function(content) {
  return '<tr>\n' + content + '</tr>\n';
};

Renderer.prototype.tablecell = function(content, flags) {
  var type = flags.header ? 'th' : 'td';
  var tag = flags.align
    ? '<' + type + ' align="' + flags.align + '">'
    : '<' + type + '>';
  return tag + content + '</' + type + '>\n';
};

// span level renderer
Renderer.prototype.strong = function(text) {
  return '<strong>' + text + '</strong>';
};

Renderer.prototype.em = function(text) {
  return '<em>' + text + '</em>';
};

Renderer.prototype.codespan = function(text) {
  return '<code>' + text + '</code>';
};

Renderer.prototype.br = function() {
  return this.options.xhtml ? '<br/>' : '<br>';
};

Renderer.prototype.del = function(text) {
  return '<del>' + text + '</del>';
};

Renderer.prototype.link = function(href, title, text) {
  href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
  if (href === null) {
    return text;
  }
  var out = '<a href="' + escape(href) + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

Renderer.prototype.image = function(href, title, text) {
  href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
  if (href === null) {
    return text;
  }

  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

Renderer.prototype.text = function(text) {
  return text;
};

/**
 * TextRenderer
 * returns only the textual part of the token
 */

function TextRenderer() {}

// no need for block level renderers

TextRenderer.prototype.strong =
TextRenderer.prototype.em =
TextRenderer.prototype.codespan =
TextRenderer.prototype.del =
TextRenderer.prototype.text = function(text) {
  return text;
};

TextRenderer.prototype.link =
TextRenderer.prototype.image = function(href, title, text) {
  return '' + text;
};

TextRenderer.prototype.br = function() {
  return '';
};

/**
 * Parsing & Compiling
 */

function Parser(options) {
  this.tokens = [];
  this.token = null;
  this.options = options || marked.defaults;
  this.options.renderer = this.options.renderer || new Renderer();
  this.renderer = this.options.renderer;
  this.renderer.options = this.options;
  this.slugger = new Slugger();
}

/**
 * Static Parse Method
 */

Parser.parse = function(src, options) {
  var parser = new Parser(options);
  return parser.parse(src);
};

/**
 * Parse Loop
 */

Parser.prototype.parse = function(src) {
  this.inline = new InlineLexer(src.links, this.options);
  // use an InlineLexer with a TextRenderer to extract pure text
  this.inlineText = new InlineLexer(
    src.links,
    merge({}, this.options, { renderer: new TextRenderer() })
  );
  this.tokens = src.reverse();

  var out = '';
  while (this.next()) {
    out += this.tok();
  }

  return out;
};

/**
 * Next Token
 */

Parser.prototype.next = function() {
  this.token = this.tokens.pop();
  return this.token;
};

/**
 * Preview Next Token
 */

Parser.prototype.peek = function() {
  return this.tokens[this.tokens.length - 1] || 0;
};

/**
 * Parse Text Tokens
 */

Parser.prototype.parseText = function() {
  var body = this.token.text;

  while (this.peek().type === 'text') {
    body += '\n' + this.next().text;
  }

  return this.inline.output(body);
};

/**
 * Parse Current Token
 */

Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return this.renderer.hr();
    }
    case 'heading': {
      return this.renderer.heading(
        this.inline.output(this.token.text),
        this.token.depth,
        unescape(this.inlineText.output(this.token.text)),
        this.slugger);
    }
    case 'code': {
      return this.renderer.code(this.token.text,
        this.token.lang,
        this.token.escaped);
    }
    case 'table': {
      var header = '',
          body = '',
          i,
          row,
          cell,
          j;

      // header
      cell = '';
      for (i = 0; i < this.token.header.length; i++) {
        cell += this.renderer.tablecell(
          this.inline.output(this.token.header[i]),
          { header: true, align: this.token.align[i] }
        );
      }
      header += this.renderer.tablerow(cell);

      for (i = 0; i < this.token.cells.length; i++) {
        row = this.token.cells[i];

        cell = '';
        for (j = 0; j < row.length; j++) {
          cell += this.renderer.tablecell(
            this.inline.output(row[j]),
            { header: false, align: this.token.align[j] }
          );
        }

        body += this.renderer.tablerow(cell);
      }
      return this.renderer.table(header, body);
    }
    case 'blockquote_start': {
      body = '';

      while (this.next().type !== 'blockquote_end') {
        body += this.tok();
      }

      return this.renderer.blockquote(body);
    }
    case 'list_start': {
      body = '';
      var ordered = this.token.ordered,
          start = this.token.start;

      while (this.next().type !== 'list_end') {
        body += this.tok();
      }

      return this.renderer.list(body, ordered, start);
    }
    case 'list_item_start': {
      body = '';
      var loose = this.token.loose;
      var checked = this.token.checked;
      var task = this.token.task;

      if (this.token.task) {
        body += this.renderer.checkbox(checked);
      }

      while (this.next().type !== 'list_item_end') {
        body += !loose && this.token.type === 'text'
          ? this.parseText()
          : this.tok();
      }
      return this.renderer.listitem(body, task, checked);
    }
    case 'html': {
      // TODO parse inline content if parameter markdown=1
      return this.renderer.html(this.token.text);
    }
    case 'paragraph': {
      return this.renderer.paragraph(this.inline.output(this.token.text));
    }
    case 'text': {
      return this.renderer.paragraph(this.parseText());
    }
    default: {
      var errMsg = 'Token with "' + this.token.type + '" type was not found.';
      if (this.options.silent) {
        console.log(errMsg);
      } else {
        throw new Error(errMsg);
      }
    }
  }
};

/**
 * Slugger generates header id
 */

function Slugger() {
  this.seen = {};
}

/**
 * Convert string to unique id
 */

Slugger.prototype.slug = function(value) {
  var slug = value
    .toLowerCase()
    .trim()
    .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '')
    .replace(/\s/g, '-');

  if (this.seen.hasOwnProperty(slug)) {
    var originalSlug = slug;
    do {
      this.seen[originalSlug]++;
      slug = originalSlug + '-' + this.seen[originalSlug];
    } while (this.seen.hasOwnProperty(slug));
  }
  this.seen[slug] = 0;

  return slug;
};

/**
 * Helpers
 */

function escape(html, encode) {
  if (encode) {
    if (escape.escapeTest.test(html)) {
      return html.replace(escape.escapeReplace, function(ch) { return escape.replacements[ch]; });
    }
  } else {
    if (escape.escapeTestNoEncode.test(html)) {
      return html.replace(escape.escapeReplaceNoEncode, function(ch) { return escape.replacements[ch]; });
    }
  }

  return html;
}

escape.escapeTest = /[&<>"']/;
escape.escapeReplace = /[&<>"']/g;
escape.replacements = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

escape.escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
escape.escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;

function unescape(html) {
  // explicitly match decimal, hex, and named HTML entities
  return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, function(_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

function edit(regex, opt) {
  regex = regex.source || regex;
  opt = opt || '';
  return {
    replace: function(name, val) {
      val = val.source || val;
      val = val.replace(/(^|[^\[])\^/g, '$1');
      regex = regex.replace(name, val);
      return this;
    },
    getRegex: function() {
      return new RegExp(regex, opt);
    }
  };
}

function cleanUrl(sanitize, base, href) {
  if (sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return null;
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
      return null;
    }
  }
  if (base && !originIndependentUrl.test(href)) {
    href = resolveUrl(base, href);
  }
  try {
    href = encodeURI(href).replace(/%25/g, '%');
  } catch (e) {
    return null;
  }
  return href;
}

function resolveUrl(base, href) {
  if (!baseUrls[' ' + base]) {
    // we can ignore everything in base after the last slash of its path component,
    // but we might need to add _that_
    // https://tools.ietf.org/html/rfc3986#section-3
    if (/^[^:]+:\/*[^/]*$/.test(base)) {
      baseUrls[' ' + base] = base + '/';
    } else {
      baseUrls[' ' + base] = rtrim(base, '/', true);
    }
  }
  base = baseUrls[' ' + base];

  if (href.slice(0, 2) === '//') {
    return base.replace(/:[\s\S]*/, ':') + href;
  } else if (href.charAt(0) === '/') {
    return base.replace(/(:\/*[^/]*)[\s\S]*/, '$1') + href;
  } else {
    return base + href;
  }
}
var baseUrls = {};
var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

function noop() {}
noop.exec = noop;

function merge(obj) {
  var i = 1,
      target,
      key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}

function splitCells(tableRow, count) {
  // ensure that every cell-delimiting pipe has a space
  // before it to distinguish it from an escaped pipe
  var row = tableRow.replace(/\|/g, function(match, offset, str) {
        var escaped = false,
            curr = offset;
        while (--curr >= 0 && str[curr] === '\\') escaped = !escaped;
        if (escaped) {
          // odd number of slashes means | is escaped
          // so we leave it alone
          return '|';
        } else {
          // add space before unescaped |
          return ' |';
        }
      }),
      cells = row.split(/ \|/),
      i = 0;

  if (cells.length > count) {
    cells.splice(count);
  } else {
    while (cells.length < count) cells.push('');
  }

  for (; i < cells.length; i++) {
    // leading or trailing whitespace is ignored per the gfm spec
    cells[i] = cells[i].trim().replace(/\\\|/g, '|');
  }
  return cells;
}

// Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
// /c*$/ is vulnerable to REDOS.
// invert: Remove suffix of non-c chars instead. Default falsey.
function rtrim(str, c, invert) {
  if (str.length === 0) {
    return '';
  }

  // Length of suffix matching the invert condition.
  var suffLen = 0;

  // Step left until we fail to match the invert condition.
  while (suffLen < str.length) {
    var currChar = str.charAt(str.length - suffLen - 1);
    if (currChar === c && !invert) {
      suffLen++;
    } else if (currChar !== c && invert) {
      suffLen++;
    } else {
      break;
    }
  }

  return str.substr(0, str.length - suffLen);
}

function findClosingBracket(str, b) {
  if (str.indexOf(b[1]) === -1) {
    return -1;
  }
  var level = 0;
  for (var i = 0; i < str.length; i++) {
    if (str[i] === '\\') {
      i++;
    } else if (str[i] === b[0]) {
      level++;
    } else if (str[i] === b[1]) {
      level--;
      if (level < 0) {
        return i;
      }
    }
  }
  return -1;
}

function checkSanitizeDeprecation(opt) {
  if (opt && opt.sanitize && !opt.silent) {
    console.warn('marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options');
  }
}

/**
 * Marked
 */

function marked(src, opt, callback) {
  // throw error in case of non string input
  if (typeof src === 'undefined' || src === null) {
    throw new Error('marked(): input parameter is undefined or null');
  }
  if (typeof src !== 'string') {
    throw new Error('marked(): input parameter is of type '
      + Object.prototype.toString.call(src) + ', string expected');
  }

  if (callback || typeof opt === 'function') {
    if (!callback) {
      callback = opt;
      opt = null;
    }

    opt = merge({}, marked.defaults, opt || {});
    checkSanitizeDeprecation(opt);

    var highlight = opt.highlight,
        tokens,
        pending,
        i = 0;

    try {
      tokens = Lexer.lex(src, opt);
    } catch (e) {
      return callback(e);
    }

    pending = tokens.length;

    var done = function(err) {
      if (err) {
        opt.highlight = highlight;
        return callback(err);
      }

      var out;

      try {
        out = Parser.parse(tokens, opt);
      } catch (e) {
        err = e;
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!pending) return done();

    for (; i < tokens.length; i++) {
      (function(token) {
        if (token.type !== 'code') {
          return --pending || done();
        }
        return highlight(token.text, token.lang, function(err, code) {
          if (err) return done(err);
          if (code == null || code === token.text) {
            return --pending || done();
          }
          token.text = code;
          token.escaped = true;
          --pending || done();
        });
      })(tokens[i]);
    }

    return;
  }
  try {
    if (opt) opt = merge({}, marked.defaults, opt);
    checkSanitizeDeprecation(opt);
    return Parser.parse(Lexer.lex(src, opt), opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/markedjs/marked.';
    if ((opt || marked.defaults).silent) {
      return '<p>An error occurred:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  return marked;
};

marked.getDefaults = function() {
  return {
    baseUrl: null,
    breaks: false,
    gfm: true,
    headerIds: true,
    headerPrefix: '',
    highlight: null,
    langPrefix: 'language-',
    mangle: true,
    pedantic: false,
    renderer: new Renderer(),
    sanitize: false,
    sanitizer: null,
    silent: false,
    smartLists: false,
    smartypants: false,
    xhtml: false
  };
};

marked.defaults = marked.getDefaults();

/**
 * Expose
 */

marked.Parser = Parser;
marked.parser = Parser.parse;

marked.Renderer = Renderer;
marked.TextRenderer = TextRenderer;

marked.Lexer = Lexer;
marked.lexer = Lexer.lex;

marked.InlineLexer = InlineLexer;
marked.inlineLexer = InlineLexer.output;

marked.Slugger = Slugger;

marked.parse = marked;

if ('object' !== 'undefined' && 'object' === 'object') {
  module.exports = marked;
} else if (typeof undefined === 'function' && undefined.amd) {
  undefined(function() { return marked; });
} else {
  root.marked = marked;
}
})(commonjsGlobal || (typeof window !== 'undefined' ? window : commonjsGlobal));
});

const GET_SITES = gql `
  {
    sites(filter: "Available_Online = 1") {
      name
      id
    }
  }
`;
const GET_USER = gql `
  {
    user {
      site {
        id
        name
      }
    }
  }
`;
const GET_PROMOS = gql `
  {
    promos {
      targetAudience
      title
      description
      qualifiedUrl
      imageUrl
    }
  }
`;
const SET_SITE = gql `
  mutation setSite($siteId: ID!) {
    setSite(siteId: $siteId) {
      site {
        id
        name
      }
    }
  }
`;
const GET_COPY = gql `
  {
    contentBlocks(filters: { category: "site happenings" }) {
      content
      slug
    }
  }
`;

const GET_COPY$1 = gql `
query contentBlocks($componentName: String) {
  contentBlocks(filters: { category: $componentName }) {
    content
    slug
  }
}
`;

class ContentBlockHandler {
    constructor(apolloClient, componentName) {
        this.copy = [];
        this.apolloClient = apolloClient;
        this.componentName = componentName;
    }
    getCopy() {
        return this.apolloClient
            .query({ query: GET_COPY$1, variables: { componentName: this.componentName } })
            .then(response => {
            this.copy = response.data.contentBlocks;
            return response.data.contentBlocks;
        });
    }
    getContentBlock(slug) {
        if (!this.copy)
            return null;
        const contentBlock = this.copy.find(c => c.slug === slug);
        if (!contentBlock)
            return;
        return h("div", { innerHTML: contentBlock.content.toString() });
    }
}

class SiteHappenings {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.analytics = window['analytics'] || {};
        this.contentfulSites = [];
        this.sites = [];
        this.happenings = [];
        this.user = null;
    }
    watchHandler(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.apolloClient = CrdsApollo(newValue);
            this.getUser();
        }
    }
    /** Stencil Personalization Components Defaults **/
    // This lets unit tests capture and confirm errors rather than listening in on console.error
    logError(err) {
        console.error(err);
    }
    getInViewDetails() {
        return { selectedSite: this.selectedSite };
    }
    /** Stencil Lifecycle methods **/
    componentDidLoad() {
        Utils.trackInView(this.host, 'HappeningComponent', this.getInViewDetails.bind(this));
    }
    componentWillLoad() {
        this.apolloClient = CrdsApollo(this.authToken);
        this.contentBlockHandler = new ContentBlockHandler(this.apolloClient, 'site happenings');
        Promise.all([this.getSites(), this.getPromos(), this.contentBlockHandler.getCopy(), this.getUser()]).then(() => {
            this.validateSelectedSite((this.user && this.user.site) || 'Churchwide');
        });
    }
    componentDidRender() {
        this.handleParentElementWidthBasedOnText(this.host.shadowRoot.querySelector('.happenings-dropdown-select'), this.selectedSite);
    }
    /** GraphQL I/O **/
    getSites() {
        return this.apolloClient
            .query({ query: GET_SITES })
            .then(response => {
            this.validateSites(response.data.sites);
            return;
        })
            .catch(err => {
            this.logError(err);
        });
    }
    getUser() {
        if (!this.authToken)
            return Promise.resolve(this.resetUser());
        return this.apolloClient
            .query({ query: GET_USER })
            .then(response => {
            const user = response.data.user;
            const siteName = user.site && user.site.name;
            this.validateUserSite(siteName);
            this.validateSelectedSite(this.user.site);
            return;
        })
            .catch(err => {
            this.resetUser();
            this.logError(err);
        });
    }
    getPromos() {
        return this.apolloClient
            .query({ query: GET_PROMOS })
            .then(response => {
            const promoList = response.data.promos;
            this.setHappenings(promoList);
            this.setContentfulSites();
            this.renderHappenings();
            return;
        })
            .catch(err => this.logError(err));
    }
    setUserSite(siteId) {
        return this.apolloClient
            .mutate({
            variables: { siteId: siteId },
            mutation: SET_SITE
        })
            .catch(err => {
            this.logError(err);
        });
    }
    /** Setters **/
    resetUser() {
        this.user = null;
        this.validateSelectedSite('Churchwide');
    }
    /**
     * Set sites after sorting and removing invalid/excluded sites
     * @param sites
     */
    validateSites(sites) {
        const allowedSites = sites.filter(site => typeof site.name === 'string' && site.name !== 'Not site specific' && site.name !== 'Xroads Church');
        this.sites = allowedSites.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    }
    /**
     * Sets user's site if new site is a non-empty string
     * @param siteName
     */
    validateUserSite(siteName) {
        if (typeof siteName === 'string' && siteName !== '') {
            this.user = { site: siteName };
        }
    }
    /**
     * Sets selectdSite to given site name if name meets conditions or 'Churchwide'.
     * This method will trigger a re-render of the component.
     * @param siteName
     */
    validateSelectedSite(siteName) {
        if (siteName === 'Not site specific' ||
            siteName === 'I do not attend Crossroads' ||
            siteName === 'Anywhere' ||
            siteName === '') {
            siteName = 'Churchwide';
        }
        if (this.contentfulSites.includes(siteName))
            this.selectedSite = siteName;
    }
    /**
     * Sets happenings to a list of Contentful promos with audiences
     * @param promoList
     */
    setHappenings(promoList) {
        this.happenings = promoList.filter(promo => promo.targetAudience !== null);
    }
    /**
     * Sets contentfulSites to unique contentful sites currently in happenings
     */
    setContentfulSites() {
        const uniqueAudiences = new Set();
        this.happenings.forEach(promo => promo.targetAudience.forEach(audience => uniqueAudiences.add(audience)));
        this.contentfulSites = Array.from(uniqueAudiences).sort((a, b) => (a > b ? 1 : b > a ? -1 : 0));
    }
    /** Event handlers/DOM modifiers **/
    /**
     * Update selected site based on selection in dropdown
     * @param event
     */
    handleSiteSelection(event) {
        this.validateSelectedSite(event.target.value);
        this.analytics.track('HappeningSiteFiltered', {
            site: this.selectedSite
        });
    }
    /**
     * Override HTML's behavior of
     * sizing dropdowns to the largest
     * string in the list
     */
    handleParentElementWidthBasedOnText(element, text) {
        let tmpSelect = document.createElement('select');
        let styles = window.getComputedStyle(element);
        tmpSelect.style.visibility = 'hidden';
        tmpSelect.style.margin = styles.margin;
        tmpSelect.style.padding = styles.padding;
        tmpSelect.style.fontSize = styles.fontSize;
        tmpSelect.style.fontFamily = styles.fontFamily;
        tmpSelect.style.webkitAppearance = 'none';
        let tmpOption = document.createElement('option');
        tmpOption.innerText = text;
        tmpSelect.appendChild(tmpOption);
        this.host.shadowRoot.appendChild(tmpSelect);
        element.parentNode.style.width = `${tmpSelect.offsetWidth + 12}px`;
        this.host.shadowRoot.removeChild(tmpSelect);
    }
    /**
     * Report data to analytics when happenings card clicked
     * @param event
     */
    handleHappeningsClicked(event) {
        let target = event.target;
        let params = {
            title: target.tagName === 'A' ? target.innerText.toLowerCase() : target.alt.toLowerCase(),
            url: target.tagName === 'A' ? target.href : target.parentNode.href,
            userSite: (this.user && this.user.site) || 'logged out',
            selectedSite: this.selectedSite
        };
        this.analytics.track('HappeningCardClicked', {
            params
        });
    }
    /**
     * Receive user input from the select site
     * modal
     */
    handleSetSiteInput(event) {
        //Set variables
        const siteName = event.target.options[event.target.selectedIndex].text;
        this.validateUserSite(siteName);
        this.validateSelectedSite(siteName);
        //Modify DOM
        this.handleSetSiteModalClose();
        //Store changes to DB
        const selectedSiteId = event.target.value;
        this.setUserSite(selectedSiteId);
        //Report to analytics
        this.analytics.track('HappeningSiteUpdated', {
            id: selectedSiteId,
            name: this.selectedSite
        });
    }
    /**
     * Close the site select modal
     */
    handleSetSiteModalClose() {
        this.host.shadowRoot.querySelector('.site-select-message').classList.add('hidden');
    }
    /**
     * Map 4 fake cards while processing data
     * from ctfl
     */
    renderHappeningsSkeleton() {
        let arr = [];
        if (window.innerWidth < 768) {
            arr.push(1, 2);
        }
        else if (window.innerWidth < 960) {
            arr.push(1, 2, 3);
        }
        else {
            arr.push(1, 2, 3, 4);
        }
        return arr.map(() => (h("div", { class: "skeleton skeleton-happenings" }, h("div", { class: "image shimmer" }), h("div", { class: "content" }, h("div", { class: "overlap" }, h("div", { class: "text title shimmer" }), h("div", { class: "text title shimmer" })), h("div", { class: "text subtitle shimmer" }), h("div", { class: "text subtitle shimmer" }), h("div", { class: "text subtitle shimmer" }), h("div", { class: "text subtitle shimmer" })))));
    }
    /**
     * Display happenings cards filtered by dropdown
     */
    renderHappenings() {
        if (!this.selectedSite)
            return this.renderHappeningsSkeleton();
        return this.happenings
            .filter(happening => happening.targetAudience.find(ta => ta === this.selectedSite))
            .map((obj, index) => (h("div", { class: "card carousel-cell", key: index }, h("a", { class: "relative", href: obj.qualifiedUrl, onClick: event => this.handleHappeningsClicked(event) }, h("img", { alt: obj.title, class: "img-responsive", src: Utils.imgixify(obj.imageUrl) + `?auto=format&w=400&h=300&fit=crop` })), h("div", { class: "card-block" }, h("h4", { class: "card-title card-title--overlap text-uppercase" }, h("a", { href: obj.qualifiedUrl, onClick: event => this.handleHappeningsClicked(event) }, obj.title)), h("div", { class: "card-text", innerHTML: marked(obj.description || '') })))));
    }
    /**
     * Returns set site modal if conditions are met or empty string
     */
    maybeRenderSetSiteModal() {
        if (this.user && !this.isUserSiteSet())
            return this.renderSetSiteModal();
        return '';
    }
    /**
     * User selects site
     */
    renderSetSiteModal() {
        return (h("div", { class: "site-select-message" }, h("button", { type: "button", class: "close", "aria-label": "Close", onClick: () => this.handleSetSiteModalClose() }, h("svg", { xmlns: "http://www.w3.org/2000/svg" }, h("line", { x1: "1", y1: "10", x2: "10", y2: "1", stroke: "#fff", strokeWidth: "2" }), h("line", { x1: "1", y1: "1", x2: "10", y2: "10", stroke: "#fff", strokeWidth: "2" }))), h("div", { class: "text-center push-top w-100" }, this.contentBlockHandler.getContentBlock('SiteHappeningsPrompt'), h("div", { class: "happenings-dropdown", "data-automation-id": "happenings-choose-site" }, h("select", { class: "dropdown w-100", onInput: event => this.handleSetSiteInput(event) }, h("option", { disabled: true, selected: true }, "Choose a site"), this.sites.map(site => (h("option", { value: site.id, "data-name": site.name }, site.name)))), h("svg", { class: "dropdown-caret icon icon-1 pull-right push-left", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 237 152" }, h("path", { d: "M200.731 135.586L92.136 244.182c-1.854 1.853-4.05 2.78-6.587 2.78s-4.731-.927-6.586-2.78l-24.295-24.295c-1.854-1.854-2.781-4.05-2.781-6.587s.927-4.732 2.78-6.586L132.385 129 54.669 51.285c-1.854-1.853-2.781-4.05-2.781-6.586 0-2.537.927-4.732 2.78-6.587l24.296-24.295c1.854-1.853 4.05-2.78 6.586-2.78 2.537 0 4.732.927 6.587 2.78L200.73 122.414c1.854 1.853 2.781 4.049 2.781 6.586s-.927 4.732-2.78 6.586z", transform: "translate(-9 -53) rotate(90 127.7 129)" }))), h("p", null, h("small", null, "*This will update the site field in your profile")))));
    }
    /** Helpers **/
    isUserSiteSet() {
        return this.user.site && this.user.site !== 'Not site specific';
    }
    /** Render **/
    render() {
        return (h("div", { class: "container push-top" }, h("div", { class: "relative" }, this.maybeRenderSetSiteModal(), h("hr", { class: "push-half-bottom" }), h("div", { class: "happenings-dropdown-container push-half-bottom" }, h("h4", { id: "happening-filter-label", class: "flush font-size-base font-family-base text-gray-light" }, "happening at crossroads"), h("div", { class: "happenings-dropdown", "data-automation-id": "happenings-dropdown" }, h("select", { class: "happenings-dropdown-select font-family-base", onInput: event => this.handleSiteSelection(event) }, this.contentfulSites.map(siteName => (h("option", { value: siteName, selected: this.selectedSite === siteName }, siteName)))), h("svg", { class: "dropdown-caret icon icon-1 pull-right push-left", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 237 152" }, h("path", { d: "M200.731 135.586L92.136 244.182c-1.854 1.853-4.05 2.78-6.587 2.78s-4.731-.927-6.586-2.78l-24.295-24.295c-1.854-1.854-2.781-4.05-2.781-6.587s.927-4.732 2.78-6.586L132.385 129 54.669 51.285c-1.854-1.853-2.781-4.05-2.781-6.586 0-2.537.927-4.732 2.78-6.587l24.296-24.295c1.854-1.853 4.05-2.78 6.586-2.78 2.537 0 4.732.927 6.587 2.78L200.73 122.414c1.854 1.853 2.781 4.049 2.781 6.586s-.927 4.732-2.78 6.586z", transform: "translate(-9 -53) rotate(90 127.7 129)" })), this.selectedSite === (this.user && this.user.site) ? h("span", { class: "my-site-label" }, "(my site)") : '')), h("div", { class: "card-deck carousel", "data-crds-carousel": "mobile-scroll" }, h("div", { id: "section-what-s-happening", class: "feature-cards card-deck--expanded-layout carousel", "data-automation-id": "happenings-cards", "data-crds-carousel": "mobile-scroll" }, this.renderHappenings())))));
    }
    get host() { return getElement(this); }
    static get watchers() { return {
        "authToken": ["watchHandler"]
    }; }
    static get style() { return "\@charset \"UTF-8\";\n* {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\n.relative {\n  position: relative;\n}\n\n.overflow-hidden {\n  overflow: hidden;\n}\n\n.d-flex {\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.d-block {\n  display: block;\n}\n\n.d-inline {\n  display: inline;\n}\n\n.d-none {\n  display: none;\n}\n\n.align-items-center {\n  -ms-flex-align: center;\n  align-items: center;\n}\n\n.w-100 {\n  width: 100%;\n}\n\n.img-responsive {\n  display: block;\n  height: auto;\n  max-width: 100%;\n}\n\nhr {\n  border: 0;\n  border-top: 1px solid #e7e7e7;\n  margin-bottom: 1rem;\n  margin-top: 1rem;\n}\n\n.font-family-base {\n  font-family: \"acumin-pro\", helvetica, arial, sans-serif !important;\n  font-weight: 300 !important;\n}\n\n.text-white {\n  color: #fff !important;\n}\n\n.text-gray-light {\n  color: #979797 !important;\n}\n\n.text-gray {\n  color: #737373 !important;\n}\n\n.text-center {\n  text-align: center;\n}\n\n.text-uppercase {\n  text-transform: uppercase;\n}\n.text-uppercase.font-size-smaller {\n  font-size: 13px !important;\n  letter-spacing: 0.5px;\n}\n\n.font-size-base {\n  font-size: 16px !important;\n}\n\@media (min-width: 480px) {\n  .font-size-base {\n    font-size: 19px !important;\n  }\n}\n\n.font-size-large {\n  font-size: 19px !important;\n}\n\@media (min-width: 480px) {\n  .font-size-large {\n    font-size: 22px !important;\n  }\n}\n\n.font-size-smaller {\n  font-size: 14px !important;\n}\n\n.font-size-smallest {\n  font-size: 10px;\n}\n\n.font-weight-mid {\n  font-weight: 500;\n}\n\n.bg-charcoal {\n  background-color: #171717;\n}\n\n.flush {\n  margin: 0 !important;\n}\n\n.flush-bottom {\n  margin-bottom: 0 !important;\n}\n\n.flush-top {\n  margin-top: 0 !important;\n}\n\n.push-half-bottom {\n  margin-bottom: 12px !important;\n}\n\n.push-bottom {\n  margin-bottom: 24px !important;\n}\n\n.push-top {\n  margin-top: 24px;\n}\n\n.push-half-top {\n  margin-top: 12px !important;\n}\n\n.soft-quarter-top {\n  padding-top: 6px;\n}\n\n.component-header {\n  font-family: \"acumin-pro-extra-condensed\";\n  font-size: 2rem;\n  font-weight: 500;\n  line-height: 0.95;\n  text-transform: uppercase;\n}\n\@media (min-width: 480px) {\n  .component-header {\n    font-size: 2.125rem;\n  }\n}\n\n.card > a {\n  color: inherit;\n  display: block;\n  text-decoration: none;\n}\n.card img {\n  width: 100%;\n}\n\n.color-gray {\n  color: #737373;\n}\n\n.media-label {\n  display: -ms-flexbox;\n  display: flex;\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  padding: 6px 8px;\n}\n.media-label > *:not(:last-child) {\n  margin-right: 5px;\n}\n.media-label .icon {\n  fill: #fff;\n  height: 16px;\n  width: 12px;\n}\n\n.btn {\n  display: inline-block;\n  margin-bottom: 0;\n  font-weight: 300;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  -ms-touch-action: manipulation;\n  touch-action: manipulation;\n  cursor: pointer;\n  background-image: none;\n  border: 1px solid transparent;\n  padding: 8px 10px;\n  font-size: 16px;\n  line-height: 1.5;\n  border-radius: 4px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  border-radius: 4px;\n  line-height: 1;\n  margin-top: 5px;\n  margin-bottom: 5px;\n  font-size: 14px;\n  padding: 13px 16px;\n}\n.btn.btn-gray-light {\n  color: #fff;\n  background-color: #979797;\n  border-color: #979797;\n}\n.btn.btn-gray-light.btn-outline {\n  background: transparent;\n  border-style: solid;\n  border-width: 1px;\n  color: #979797;\n}\n.btn.btn-gray-light.btn-outline:hover {\n  background-color: #979797;\n  color: #fff;\n}\n.btn.btn-sm {\n  font-size: 13px;\n  padding: 10px 16px 11px;\n}\n\n.skeleton {\n  overflow: hidden;\n  position: relative;\n}\n.skeleton .shimmer {\n  overflow: hidden;\n}\n.skeleton .shimmer::after {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  -webkit-transform: translateX(-100%);\n  transform: translateX(-100%);\n  background-image: linear-gradient(100deg, #f0f0f0 20%, rgba(255, 255, 255, 0.3) 30%, rgba(255, 255, 255, 0.7) 40%, #f0f0f0 50%);\n  -webkit-animation: shimmer 1.5s infinite;\n  animation: shimmer 1.5s infinite;\n  -webkit-animation-timing-function: ease;\n  animation-timing-function: ease;\n  content: \"\";\n}\n.skeleton .shimmer-reverse::after {\n  background-image: linear-gradient(100deg, white 20%, rgba(240, 240, 240, 0.3) 30%, rgba(240, 240, 240, 0.7) 40%, white 50%);\n}\n\n\@-webkit-keyframes shimmer {\n  to {\n    -webkit-transform: translateX(100%);\n    transform: translateX(100%);\n  }\n}\n\n\@keyframes shimmer {\n  to {\n    -webkit-transform: translateX(100%);\n    transform: translateX(100%);\n  }\n}\n.happenings-dropdown-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n}\n\@media (min-width: 480px) {\n  .happenings-dropdown-container {\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -ms-flex-align: center;\n    align-items: center;\n  }\n}\n\n.happenings-dropdown {\n  position: relative;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n}\n.happenings-dropdown .happenings-dropdown-select {\n  font-size: 19px;\n  position: relative;\n  background: 0;\n  border: 0;\n  margin: 0;\n  color: #0095d9;\n  padding: 0.5rem 0;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  width: 100%;\n}\n.happenings-dropdown .happenings-dropdown-select:hover {\n  cursor: pointer;\n}\n.happenings-dropdown .happenings-dropdown-select:focus {\n  outline: 0;\n}\n\@media (min-width: 480px) {\n  .happenings-dropdown .happenings-dropdown-select {\n    padding: 0.5rem;\n  }\n}\n.happenings-dropdown .dropdown-caret {\n  fill: #0095d9;\n  position: absolute;\n  width: 0.75rem;\n  right: 0;\n  padding-top: 4px;\n  pointer-events: none;\n}\n\@media (min-width: 480px) {\n  .happenings-dropdown .dropdown-caret {\n    right: 6px;\n  }\n}\n.happenings-dropdown .my-site-label {\n  position: absolute;\n  width: 100%;\n  left: calc(100% + 0.625rem);\n  font-size: 0.875rem;\n  color: #979797;\n}\n\n.site-select-message {\n  position: absolute;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -ms-flex-align: center;\n  align-items: center;\n  width: 100%;\n  height: 100%;\n  background-color: white;\n  -webkit-transition: opacity 0.5s ease-in-out;\n  transition: opacity 0.5s ease-in-out;\n  opacity: 1;\n  z-index: 1;\n}\n.site-select-message .happenings-dropdown {\n  -ms-flex-pack: center;\n  justify-content: center;\n}\n\@media (min-width: 768px) {\n  .site-select-message .happenings-dropdown {\n    margin: 0 auto;\n    width: 33.333333%;\n  }\n}\n.site-select-message .happenings-dropdown .dropdown {\n  display: inline-block;\n  font-weight: 300;\n  text-align: center;\n  font-size: 14px;\n  line-height: 1;\n  white-space: nowrap;\n  vertical-align: middle;\n  -ms-touch-action: manipulation;\n  touch-action: manipulation;\n  cursor: pointer;\n  background-image: none;\n  font-size: 16px;\n  line-height: 1.5;\n  border-radius: 4px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  margin-top: 5px;\n  margin-bottom: 5px;\n  padding: 10px;\n  background: transparent;\n  border: solid 1px #0095d9;\n  color: #0095d9;\n  -webkit-appearance: none;\n}\n.site-select-message .happenings-dropdown .dropdown:focus {\n  outline: 0;\n}\n\@media (max-width: 480px) {\n  .site-select-message .happenings-dropdown .dropdown {\n    width: 100%;\n  }\n}\n.site-select-message .happenings-dropdown .dropdown-caret {\n  right: 20px;\n}\n.site-select-message .close {\n  position: absolute;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  top: 1rem;\n  right: 1rem;\n  background-color: rgba(187, 187, 187, 0.6);\n  border-radius: 50%;\n  width: 1.5rem;\n  height: 1.5rem;\n  font-weight: unset;\n  opacity: 1;\n  padding: 0;\n  cursor: pointer;\n  border: 0;\n}\n.site-select-message .close:hover {\n  cursor: pointer;\n}\n.site-select-message .close svg {\n  width: 10px;\n  height: 10px;\n  stroke: white;\n}\n\n.hidden {\n  visibility: hidden;\n  opacity: 0;\n}\n\n.card-deck .card {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n  -ms-flex-direction: column;\n  flex-direction: column;\n}\n\n.card-deck--expanded-layout {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-flow: row nowrap;\n  -ms-flex-flow: row nowrap;\n  flex-flow: row nowrap;\n  -webkit-overflow-scrolling: touch;\n  overflow-x: scroll;\n  -webkit-scroll-snap-type: x mandatory;\n  -ms-scroll-snap-type: x mandatory;\n  scroll-snap-type: x mandatory;\n}\n\@media (min-width: 768px) {\n  .card-deck--expanded-layout {\n    -ms-flex-wrap: wrap;\n    flex-wrap: wrap;\n  }\n}\n.card-deck--expanded-layout .card,\n.card-deck--expanded-layout .skeleton-happenings {\n  cursor: auto;\n  -webkit-flex: 1 0 270px;\n  -ms-flex: 1 0 270px;\n  flex: 1 0 270px;\n  -ms-flex-preferred-size: 270px;\n  flex-basis: 270px;\n  margin-bottom: 1.5rem;\n  padding: 0 0.5rem;\n  position: relative;\n  max-width: 100%;\n  scroll-snap-align: start;\n}\n.card-deck--expanded-layout .card:first-child,\n.card-deck--expanded-layout .skeleton-happenings:first-child {\n  padding-left: 0;\n}\n.card-deck--expanded-layout .card:last-child,\n.card-deck--expanded-layout .skeleton-happenings:last-child {\n  padding-right: 0;\n}\n\@media (min-width: 480px) {\n  .card-deck--expanded-layout .card,\n.card-deck--expanded-layout .skeleton-happenings {\n    max-width: 50%;\n  }\n}\n\@media (min-width: 768px) {\n  .card-deck--expanded-layout .card,\n.card-deck--expanded-layout .skeleton-happenings {\n    max-width: 33.333333%;\n  }\n}\n\@media (min-width: 960px) {\n  .card-deck--expanded-layout .card,\n.card-deck--expanded-layout .skeleton-happenings {\n    max-width: 25%;\n  }\n}\n.card-deck--expanded-layout .card a,\n.card-deck--expanded-layout .skeleton-happenings a {\n  color: inherit;\n  text-decoration: none;\n}\n.card-deck--expanded-layout .card .card-text,\n.card-deck--expanded-layout .skeleton-happenings .card-text {\n  font-size: 0.9375rem;\n  position: relative;\n}\n.card-deck--expanded-layout .card .card-text p,\n.card-deck--expanded-layout .skeleton-happenings .card-text p {\n  margin: 0;\n}\n.card-deck--expanded-layout .card .card-block,\n.card-deck--expanded-layout .skeleton-happenings .card-block {\n  font-family: \"acumin-pro\", helvetica, arial, sans-serif;\n  padding: 1rem;\n}\n.card-deck--expanded-layout .card .card-block .component-header,\n.card-deck--expanded-layout .skeleton-happenings .card-block .component-header {\n  line-height: 0.95;\n}\n\n.skeleton-happenings {\n  height: 500px;\n  margin: 0;\n}\n.skeleton-happenings .image {\n  height: 75%;\n  max-height: 200px;\n  width: 100%;\n}\n.skeleton-happenings .image,\n.skeleton-happenings .text {\n  background-color: #f0f0f0;\n  position: relative;\n}\n.skeleton-happenings .content {\n  padding: 0.5rem;\n}\n.skeleton-happenings .content .overlap {\n  background: white;\n  padding: 0.5rem;\n  -webkit-transform: translateY(-40%);\n  transform: translateY(-40%);\n}\n.skeleton-happenings .content .title {\n  height: 24px;\n  margin-bottom: 0.5rem;\n}\n.skeleton-happenings .content .title:nth-child(2) {\n  width: 75%;\n}\n.skeleton-happenings .content .subtitle {\n  height: 16px;\n  margin: 0.5rem;\n}\n.skeleton-happenings .content .subtitle:nth-child(3) {\n  width: 75%;\n}\n.skeleton-happenings .content .subtitle:nth-child(4) {\n  width: 85%;\n}\n.skeleton-happenings .content .subtitle:nth-child(5) {\n  width: 50%;\n}\n\n.img-responsive {\n  display: block;\n  height: auto;\n  max-width: 100%;\n}\n\n.card-title--overlap {\n  background-color: #fff;\n  display: inline-block;\n  font-family: \"acumin-pro-extra-condensed\", sans-serif;\n  font-size: 2.125rem;\n  margin: -2rem -0.5rem 0;\n  padding: 0.25rem 0.5rem;\n  position: relative;\n}\n.card-title--overlap::after {\n  color: #979797;\n  content: \"—\";\n  display: block;\n  font-family: \"acumin-pro\", helvetica, arial, sans-serif;\n  font-size: 1.25rem;\n  font-weight: 100;\n  line-height: 1.5;\n}\n\n.card-title {\n  color: #4d4d4d;\n  line-height: 1;\n  font-weight: 600;\n}\n\n.text-uppercase {\n  text-transform: uppercase !important;\n}\n\n.component-header {\n  font-family: \"acumin-pro-extra-condensed\", sans-serif;\n  font-size: 2rem;\n  font-weight: 500;\n  line-height: 1.1;\n  text-transform: uppercase;\n}"; }
}

export { SiteHappenings as crds_site_happenings };
