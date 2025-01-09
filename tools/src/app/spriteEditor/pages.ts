const routes = [
    {
        path: '/sprites',
        name: 'sprites',
        redirect: { name: "create-spritesheet" },
        component: () => import('./SpriteEditorLayout.vue'),
        children: [
            {
                path: "new",
                name: "create-spritesheet",
                component: () => import('./CreateSpriteSheet.vue')
            }
        ]
    }
]


export function useSpriteEditor() {
    return { routes }
}