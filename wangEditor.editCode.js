/*
 *
 * +----------------------------------------------------------------------
 * | Created by  hahadu (a low phper and coolephp)
 * +----------------------------------------------------------------------
 * | Copyright (c) 2021. [hahadu] All rights reserved.
 * +----------------------------------------------------------------------
 * | SiteUrl: https://github.com/hahadu
 * +----------------------------------------------------------------------
 * | Author: hahadu <582167246@qq.com>
 * +----------------------------------------------------------------------
 * | Date: 2021/2/25 下午1:53
 * +----------------------------------------------------------------------
 * | Description: wangEditor 源代码编辑器
 * +----------------------------------------------------------------------
 *
 */

class viewEditCode extends window.wangEditor.BtnMenu {
    viewCode(txt){
        var pos = txt.html().indexOf("<xmp>");
        if(pos<0){
            return this.appendXmp(txt);
        }else{
            return this.delXmp(txt);

        }

    }
    appendXmp(txt){
        console.log('进入源码编辑模式');
        return txt.html('<xmp>' + txt.html() + '</xmp>');
    }
    delXmp(txt){


        console.log('退出源码编辑模式');

        return txt.html($('#' + this.editor.textElemId + '>xmp').html());
    }

    constructor(editor) {
        var $isIncludeFile = function (name) {
            var js= /js$/i.test(name);
            var es=document.getElementsByTagName(js?'script':'link');
            for(var i=0;i<es.length;i++)
                if(es[i][js?'src':'href'].indexOf(name)!=-1)return true;
            return false;
        }
        if($isIncludeFile('font-awesome.css') || $isIncludeFile('font-awesome.min.css')){
            var btnFontStyle = "<li class='fa fa-code'></li>"
        }else{
            var btnFontStyle = "&rlhar;"
        }
        // data-title属性表示当鼠标悬停在该按钮上时提示该按钮的功能简述
        const $elem = window.wangEditor.$(
            '<div class="w-e-menu" data-title="源码编辑模式"> '+ btnFontStyle +' </div>'
        );
        super($elem, editor)

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



