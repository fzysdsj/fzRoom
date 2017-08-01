let s = /^(<img src).*(>)$/;
        let g = $("#content").html("<%= datas[0].artContent %>"));
        console.log(g);
        console.log("g.test(s):" + g.test(s));