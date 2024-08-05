class Camera {
    constructor(args = {}) {
        this.offset = { x: args.offsetX || 0, y: args.offsetY || 0 };
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

        this.touchStartDistance = 0;
        this.initialScale = this.scale;

        this.click = true;
    }

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
        if (!this.screenDimensions) {
            throw new Error('Screen dimensions must be set');
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
        this.Scale += delta * (-0.001) * (this.Scale / 2) * 2;

        // Restrict zoom:
        this.Scale = Math.min(Math.max(this.MinZoom, this.Scale), this.MaxZoom);

        const mouseAfterZoom = this.ScreenToWorld({ x: mouseX, y: mouseY });

        // Adjusts offset to zoom relative to the mouse position:
        this.offset.x += mouseBeforeZoom.x - mouseAfterZoom.x;
        this.offset.y += mouseBeforeZoom.y - mouseAfterZoom.y;

        this.RestrictOffset();
    }

    // ======================== || TOUCH FUNCTIONS || ======================== //

    TouchStart(touches) {
        if (touches.length === 1) {
            this.dragStart.x = touches[0].clientX;
            this.dragStart.y = touches[0].clientY;
            this.drag = true;
        } else if (touches.length === 2) {
            this.drag = false;
            this.touchStartDistance = this.calculateDistance(touches);
            this.initialScale = this.scale;
        }
    }

    TouchMove(touches) {
        if (touches.length === 1 || (touches.length === 2 && (this.scale > this.minZoom || this.scale < this.maxZoom))) {
            const touch = touches[0];
            this.offset.x -= (touch.clientX - this.dragStart.x) / this.scale;
            this.offset.y -= (touch.clientY - this.dragStart.y) / this.scale;
            this.dragStart = { x: touch.clientX, y: touch.clientY };
            this.RestrictOffset();
        }

        if (touches.length === 2) {
            const firstTouchBeforeZoom = this.ScreenToWorld({ x: touches[0].clientX, y: touches[0].clientY });

            const currentDistance = this.calculateDistance(touches);
            const zoomFactor = currentDistance / this.touchStartDistance;
            this.Scale = this.initialScale * zoomFactor;

            const firstTouchAfterZoom = this.ScreenToWorld({ x: touches[0].clientX, y: touches[0].clientY });

            this.offset.x += firstTouchBeforeZoom.x - firstTouchAfterZoom.x;
            this.offset.y += firstTouchBeforeZoom.y - firstTouchAfterZoom.y;

            this.RestrictOffset();
        }
    }

    TouchEnd(touches) {
        if (touches.length === 0) {
            this.drag = false;
        } else if (touches.length === 1) {
            this.dragStart.x = touches[0].clientX;
            this.dragStart.y = touches[0].clientY;
            this.drag = true;
        }
    }

    calculateDistance(touches) {
        const [touch1, touch2] = touches;
        const dx = touch2.clientX - touch1.clientX;
        const dy = touch2.clientY - touch1.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // ======================== || RENDER FUNCTIONS || ======================== //

    applyTransform(context) {
        context.scale(this.scale, this.scale);
        context.translate(-this.offset.x, -this.offset.y);
    }

    update(input) {
        if (input.mousedown) {
            this.MouseDown(input.mousedown.x, input.mousedown.y);
        }

        if (input.mousemove) {
            this.MouseMove(input.mousemove.x, input.mousemove.y);
        }

        if (input.mouseup) {
            this.MouseUp();
        }

        if (input.wheel) {
            this.MouseWheel(input.wheel.x, input.wheel.y, input.wheel.deltaY);
        }

        if (input.touchstart) {
            this.TouchStart(input.touchstart.touches);
        }

        if (input.touchmove) {
            this.TouchMove(input.touchmove.touches);
        }

        if (input.touchend) {
            this.TouchEnd(input.touchend.touches);
        }

        if (input.resize) {
            this.ScreenDimensions.width = window.innerWidth;   // TODO: Change this, for the love of God
            this.ScreenDimensions.height = window.innerHeight; // TODO: Change this, for the love of God
        }
    }
}