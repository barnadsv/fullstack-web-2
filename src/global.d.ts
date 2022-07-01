/// <reference types="@sveltejs/kit" />

type Todo = {
    uid: string,
    created_at: Date;
    text: string | undefined;
    done: boolean;
}
