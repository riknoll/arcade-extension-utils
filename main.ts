namespace __util {
    export class StateFactory<U> {
        protected stateStack: U[];

        constructor(public create: () => U) {
            this.stateStack = [this.create()];

            game.addScenePushHandler(() => {
                this.stateStack.push(this.create());
            });

            game.addScenePopHandler(() => {
                this.stateStack.pop();
                if (this.stateStack.length === 0) {
                    this.stateStack.push(this.create());
                }
            });
        }

        state(): U {
            return this.stateStack[this.stateStack.length - 1];
        }
    }

    let registry: StateFactory<any>[];

    export function getState<U>(factory: () => U): U {
        if (!registry) registry = [];

        for (const f of registry) {
            if (f.create === factory) return f.state();
        }

        const newFactory = new StateFactory(factory);
        registry.push(newFactory)

        return newFactory.state();
    }
}

namespace util {
    export class Point {
        constructor(public x: number, public y: number) {
        }

        public get left() {
            return this.x;
        }

        public get right() {
            return this.x;
        }

        public get top() {
            return this.y;
        }

        public get bottom() {
            return this.y;
        }
    }
}