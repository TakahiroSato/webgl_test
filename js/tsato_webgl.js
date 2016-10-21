var tsato_webgl = {
    'self':this,
    'gl':null,
    'init':function(canvasElm){
        var gl = null;
        try{
            // 標準コンテキストの取得を試みる。失敗した場合は、experimentalにフォールバック
            gl = canvasElm.getContext("webgl") || canvasElm.getContext("experimental-webgl");
        }catch(e) {}
        // GLコンテキストを取得できない場合
        if(!gl){
            alert("WebGL を初期化できません。ブラウザはサポートしていないようです。");
            gl = null;
        }

        self.gl = gl;
    }
};