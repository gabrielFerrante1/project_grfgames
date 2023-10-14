const Shortcuts = (): React.HTMLAttributes<HTMLDivElement> => ({
    onContextMenu: (e) => e.preventDefault(),
    onDoubleClick: (e) => e.preventDefault()
})

export default Shortcuts