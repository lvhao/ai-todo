import type { Todo } from '../types/todo';
export declare const useTodoStore: import("pinia").StoreDefinition<"todo", Pick<{
    todos: import("vue").Ref<{
        id: string;
        content: string;
        completed: boolean;
        createdAt: number;
    }[], Todo[] | {
        id: string;
        content: string;
        completed: boolean;
        createdAt: number;
    }[]>;
    loadTodos: () => Promise<void>;
    addTodo: (content: string) => Promise<void>;
    removeTodo: (id: string) => Promise<void>;
    toggleTodo: (id: string) => Promise<void>;
}, "todos">, Pick<{
    todos: import("vue").Ref<{
        id: string;
        content: string;
        completed: boolean;
        createdAt: number;
    }[], Todo[] | {
        id: string;
        content: string;
        completed: boolean;
        createdAt: number;
    }[]>;
    loadTodos: () => Promise<void>;
    addTodo: (content: string) => Promise<void>;
    removeTodo: (id: string) => Promise<void>;
    toggleTodo: (id: string) => Promise<void>;
}, never>, Pick<{
    todos: import("vue").Ref<{
        id: string;
        content: string;
        completed: boolean;
        createdAt: number;
    }[], Todo[] | {
        id: string;
        content: string;
        completed: boolean;
        createdAt: number;
    }[]>;
    loadTodos: () => Promise<void>;
    addTodo: (content: string) => Promise<void>;
    removeTodo: (id: string) => Promise<void>;
    toggleTodo: (id: string) => Promise<void>;
}, "addTodo" | "loadTodos" | "removeTodo" | "toggleTodo">>;
