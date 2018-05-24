export /*funclib*/ class Progress {
    private Bar: any;
    private timer: any;
    private progress: any;
    private duration: number;
    constructor(Bar: any) {
        this.Bar = Bar;
    }

    /**
     * [fn.progress.start] 开启进度条，并传入参数
     * @param options {title: string, width: number (base: 40)}
     */
    start(options: any) {
        const prog = `${options && options.title || '[fn.progress]'} [:bar] :percent`;
        this.progress = new this.Bar(prog, {
            complete: '=', incomplete: ' ',
            width: options && options['width'] || 40,
            total: options && options['total'] || 20
        });
        clearTimeout(this.timer);
        this.duration = 250;
        this.tickFun('+');
    }

    /**
     * [fn.progress.stop] 结束进度条，结束后触发回调
     * @param options 
     */
    stop(onStopped?: Function) {
        clearTimeout(this.timer);
        this.duration = 600;
        this.tickFun('-', onStopped);
    }

    private tickFun(type, onStopped?) {
        this.timer = setTimeout(() => {
            this.progress.tick();
            switch (type) {
                case '+': this.duration += 320; break;
                case '-': this.duration -= this.duration * 0.2; break;
            }
            if (this.progress.complete) {
                if (typeof onStopped === 'function') {
                    onStopped();
                }
            } else {
                this.tickFun(type, onStopped);
            }
        }, this.duration);
    }
}