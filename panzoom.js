class PanZoom {
    constructor(args) {
        this.offset = args.offset || { x: args.offsetX || 0, y: args.offsetY || 0 };
        this.scale = args.scale || 1;
        this.minZoom = args.minZoom || 0.1;
        this.maxZoom = args.maxZoom || 10;

        this.worldDimensions = args.worldDimensions; // { width, height }
        this.screenDimensions = args.screenDimensions; // { width, height }

        // Calculates the minimum zoom based on the world and screen dimensions:
        this.calculateMinZoom();

        this.drag = false;
        this.dragStart = { x: 0, y: 0 };
        this.dragEnd = { x: 0, y: 0 };

        this.click = true;

        // Canvas:
        if (!args.createCanvas) return;

        this.canvas = args.canvas || document.createElement('canvas');
        this.ctx = args.ctx || this.canvas.getContext('2d');

        this.configureCanvas();
        this.canvasFunctions = args.canvasFunctions || [];

        this.doLoop = args.doLoop || true;
    }

    // ======================== || GETTERS AND SETTERS || ======================== //

    get Offset() {
        return this.offset;
    }

    set Offset(value) {
        this.offset = value;
    }

    get Scale() {
        return this.scale;
    }

    set Scale(value) {
        this.scale = Math.min(Math.max(this.minZoom, value), this.maxZoom);
    }

    get MinZoom() {
        return this.minZoom;
    }

    set MinZoom(value) {
        if (value <= 0) {
            throw new RangeError('minZoom must be greater than 0');
        }
        this.minZoom = value;
    }

    get MaxZoom() {
        return this.maxZoom;
    }

    set MaxZoom(value) {
        if (value <= 0) {
            throw new RangeError('maxZoom must be greater than 0');
        }
        this.maxZoom = value;
    }

    get WorldDimensions() {
        return this.worldDimensions;
    }

    set WorldDimensions(value) {
        this.worldDimensions = value;
        this.calculateMinZoom();
    }

    get ScreenDimensions() {
        return this.screenDimensions;
    }

    set ScreenDimensions(value) {
        const deltaX = (value.width - this.screenDimensions.width) / this.Scale / 2;
        const deltaY = (value.height - this.screenDimensions.height) / this.Scale / 2;

        this.offset.x -= deltaX;
        this.offset.y -= deltaY;

        this.screenDimensions = value;

        this.calculateMinZoom();
    }

    get Click() {
        return this.click;
    }

    set Click(value) {
        this.click = value;
    }

    get Dragging() {
        return this.drag;
    }

    set Dragging(value) {
        this.drag = value;
    }

    get Canvas() {
        return this.canvas;
    }

    set Canvas(value) {
        this.canvas = value;
    }

    get Context() {
        return this.ctx;
    }

    set Context(value) {
        this.ctx = value;
    }

    get CanvasFunctions() {
        return this.canvasFunctions;
    }

    set CanvasFunctions(value) {
        this.canvasFunctions = value;
    }

    addCanvasFunction(func) {
        this.canvasFunctions.push(func);
    }

    removeCanvasFunction(func) {
        this.canvasFunctions = this.canvasFunctions.filter((f) => f !== func);
    }

    get doLoop() {
        return this.doLoop;
    }

    set doLoop(value) {
        this.doLoop = value;
        if (this.doLoop) {
            this.loop();
        }
    }

    // ======================== || CANVAS FUNCTIONS || ======================== //

    configureCanvas() {
        this.canvas.width = this.screenDimensions.width;
        this.canvas.height = this.screenDimensions.height;

        this.bindEvents();
    }

    bindEvents() {
        this.canvas.addEventListener('mousedown', (e) => {
            this.MouseDown(e.offsetX, e.offsetY);
        });

        this.canvas.addEventListener('mousemove', (e) => {
            this.MouseMove(e.offsetX, e.offsetY);
        });

        this.canvas.addEventListener('mouseup', () => {
            this.MouseUp();
        });

        this.canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            this.MouseWheel(e.offsetX, e.offsetY, e.deltaY);
        });

        window.addEventListener('resize', () => {
            this.ScreenDimensions = { width: window.innerWidth, height: window.innerHeight };
            this.CenterOffset();
        });
    }

    loop() {
        this.update();

        for (const func of this.canvasFunctions) {
            func();
        }

        if (!noLoop) {
            requestAnimationFrame(() => this.loop());
        }
    }

    update() {
        // Update stuff here
    }

    initialize() {
        this.CenterOffset();
        this.loop();
    }

    stop() {
        this.doLoop = false;
    }

    // ======================== || CORE FUNCTIONS || ======================== //

    // Converts world coordinates to screen coordinates:
    WorldToScreen(worldPos) {
        return {
            x: (worldPos.x - this.offset.x) * this.scale,
            y: (worldPos.y - this.offset.y) * this.scale,
        };
    }

    // Converts screen coordinates to world coordinates:
    ScreenToWorld(screenPos) {
        return {
            x: (screenPos.x / this.scale) + this.offset.x,
            y: (screenPos.y / this.scale) + this.offset.y,
        };
    }

    // ======================== || OFFSET FUNCTIONS || ======================== //

    calculateMinZoom() {
        if (!this.worldDimensions || !this.screenDimensions) return;

        const minZoomX = this.screenDimensions.width / this.worldDimensions.width;
        const minZoomY = this.screenDimensions.height / this.worldDimensions.height;

        this.MinZoom = Math.max(minZoomX, minZoomY);
        this.Scale = this.scale; // Restrict the current zoom.
    }

    RestrictOffset() {
        if (!this.worldDimensions || !this.screenDimensions) return;

        const maxOffsetX = this.worldDimensions.width / 2 - this.screenDimensions.width / this.scale;
        const maxOffsetY = this.worldDimensions.height / 2 - this.screenDimensions.height / this.scale;

        this.offset.x = Math.max(-this.worldDimensions.width / 2, Math.min(this.offset.x, maxOffsetX));
        this.offset.y = Math.max(-this.worldDimensions.height / 2, Math.min(this.offset.y, maxOffsetY));
    }

    CenterOffset() {
        if (!this.worldDimensions || !this.screenDimensions) {
            throw new Error('World and screen dimensions must be set');
        }

        this.offset = {
            x: -this.screenDimensions.width / this.scale / 2,
            y: -this.screenDimensions.height / this.scale / 2,
        };
    }

    // ======================== || MOUSE FUNCTIONS || ======================== //

    MouseDown(mouseX, mouseY) {
        this.dragStart.x = mouseX;
        this.dragStart.y = mouseY;
        this.drag = true;

        if (!this.click) this.click = true; // Click is allowed if the mouse is not dragging.
    }

    MouseMove(mouseX, mouseY) {
        if (!this.drag) return;

        if (this.click) this.click = false; // Click is not allowed if the mouse is dragging.

        // Updates the offset:
        this.offset.x -= (mouseX - this.dragStart.x) / this.scale;
        this.offset.y -= (mouseY - this.dragStart.y) / this.scale;

        // Updates drag start:
        this.dragStart = { x: mouseX, y: mouseY };

        this.RestrictOffset();
    }

    MouseUp() {
        this.drag = false;
    }

    MouseWheel(mouseX, mouseY, delta) {
        const mouseBeforeZoom = this.ScreenToWorld({ x: mouseX, y: mouseY });

        // Zoom in or out:
        this.Scale += delta * (-0.001) * (this.Scale / 2);

        // Restrict zoom:
        this.Scale = Math.min(Math.max(this.MinZoom, this.Scale), this.MaxZoom);

        const mouseAfterZoom = this.ScreenToWorld({ x: mouseX, y: mouseY });

        // Adjusts offset to zoom relative to the mouse position:
        this.offset.x += mouseBeforeZoom.x - mouseAfterZoom.x;
        this.offset.y += mouseBeforeZoom.y - mouseAfterZoom.y;

        this.RestrictOffset();
    }
}
