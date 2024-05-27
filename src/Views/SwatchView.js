export default function SwatchView(props) {
    if (!props.model) return
    return (
        <div class="Swatch" style={{ backgroundColor: props.model.color.as("lch"), width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {anchorEmoji(props.model.priority)}
        </div>
    )
}

function anchorEmoji(priority) {
    if (priority === null || priority < 0) return ""
    if (priority === 0) return  "⭐️"
    return "📍"
}
