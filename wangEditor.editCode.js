/*
 *
 * +----------------------------------------------------------------------
 * | Created by  hahadu (a low phper and coolephp)
 * +----------------------------------------------------------------------
 * | Copyright (c) 2021. [hahadu] All rights reserved.
 * +----------------------------------------------------------------------
 * | SiteUrl: https://github.com/hahadu
 * +----------------------------------------------------------------------
 * | github: https://github.com/hahadu/wangEditor-editor-code
 * | gitee : https://gitee.com/hahadu/wangEditor-editor-code
 * +----------------------------------------------------------------------
 * | Author: hahadu <582167246@qq.com>
 * +----------------------------------------------------------------------
 * | Date: 2021/2/25 下午3:53
 * +----------------------------------------------------------------------
 * | Description: wangEditor 源代码编辑器
 * +----------------------------------------------------------------------
 *
 */

class viewEditCode extends window.wangEditor.BtnMenu {
    viewCode(txt) {
        var pos = txt.html().indexOf(this.codeTage);
        if (pos < 0) {
            return this.inEditCode(txt);
        } else {
            return this.outEditCode(txt);
        }

    }

    inEditCode(txt) {

        console.log('进入源码编辑模式');
        return txt.html(this.codeTage + txt.html() + '</xmp>');

    }

    outEditCode(txt) {

        console.log('退出源码编辑模式');
        return txt.html($('#' + this.editorElementId + '>xmp').html());

    }

    _configure() {
        this.codeTage = '<xmp style="white-space:normal;">';
        this.editorElementId = this.editor.textElemId;
    }

    constructor(editor) {
        var fontAwesome = 'font-awesome.css';

        if (isIncludeFile(fontAwesome) || isIncludeFile('font-awesome.min.css')) {
            var isIncludeFontFile = true;
            var btnFontStyle = "<li class='fa fa-code'></li>";
        } else {
            var isIncludeFontFile = false;
            var btnFontStyle = "&nleftrightarrow;";
        }

        // data-title属性表示当鼠标悬停在该按钮上时提示该按钮的功能简述
        const $elem = window.wangEditor.$(
            '<div class="w-e-menu" data-title="源码编辑模式">' + btnFontStyle + ' </div>'
        );
        super($elem, editor);
        this.isIncludeFontFile = isIncludeFontFile;
        this._configure();

    }

    // 菜单点击事件
    clickHandler() {
        return this.viewCode(this.editor.txt);
    }

    tryChangeActive() {

        this.active()

    }
}

const _editCodeMenuKey = 'editCodeMenuKey'

window.wangEditor.registerMenu(_editCodeMenuKey, viewEditCode)

/****
 * 检查
 * @param name
 * @returns {boolean}
 */
function isIncludeFile(name) {
    var js = /js$/i.test(name);
    var es = document.getElementsByTagName(js ? 'script' : 'link');
    for (var i = 0; i < es.length; i++)
        if (es[i][js ? 'src' : 'href'].indexOf(name) != -1) return true;
    return false;
}
