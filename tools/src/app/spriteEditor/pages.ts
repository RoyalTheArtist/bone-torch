const routes = [
    {
        path: '/sprites',
        name: 'sprites',
        component: () => import('./SpriteSheetPage.vue'),
    }
]

export function useSpriteEditor() {
    return { routes }
}