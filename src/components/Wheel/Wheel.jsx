import { useRef, useState, useEffect } from "react";
import wheelImg from "../../assets/images/FeelingsWheel.png";
import "./Wheel.css";

const innerCircle = [
    { name: "Happy", start: 270, end: 6.59, description: "Feeling joyful and content." },
    { name: "Angry", start: 6.59, end: 94.39, description: "Feeling frustrated or upset." },
    { name: "Sad", start: 94.39, end: 147.07, description: "Feeling down or disappointed." },
    { name: "Scared", start: 147.07, end: 199.76, description: "Feeling fearful or anxious." },
    { name: "Disgusted", start: 199.76, end: 234.88, description: "Feeling revolted or appalled." },
    { name: "Surprised", start: 234.88, end: 270, description: "Feeling astonished or amazed." },
];

const middleCircle = [
    { name: "Respected", start: 270.0, end: 278.78, description: "Feeling valued and honored by others." },
    { name: "Grateful", start: 278.78, end: 287.56, description: "Feeling thankful and appreciative." },
    { name: "Enthusiastic", start: 287.56, end: 296.34, description: "Feeling excited and eager to engage." },
    { name: "Creative", start: 296.34, end: 305.12, description: "Feeling imaginative and inspired." },
    { name: "Pleased", start: 305.12, end: 313.9, description: "Feeling satisfied and content." },
    { name: "Confident", start: 313.9, end: 322.68, description: "Feeling sure of yourself and your abilities." },
    { name: "Interested", start: 322.68, end: 331.46, description: "Feeling curious and engaged." },
    { name: "Playful", start: 331.46, end: 340.24, description: "Feeling lighthearted and fun." },
    { name: "Trusting", start: 340.24, end: 349.02, description: "Feeling secure relying on others." },
    { name: "Content", start: 349.02, end: 357.8, description: "Feeling calm satisfaction and peace." },
    { name: "Joyful", start: 357.8, end: 6.58, description: "Feeling full of happiness and delight." },
    { name: "Irritable", start: 6.58, end: 15.36, description: "Feeling easily annoyed or agitated." },
    { name: "Annoyed", start: 15.36, end: 24.14, description: "Feeling mildly bothered or exasperated." },
    { name: "Envious", start: 24.14, end: 32.92, description: "Feeling jealous of others' advantages." },
    { name: "Bitter", start: 32.92, end: 41.7, description: "Feeling resentful or holding onto anger." },
    { name: "Critical", start: 41.7, end: 50.48, description: "Feeling judgmental or disapproving." },
    { name: "Aggressive", start: 50.48, end: 59.26, description: "Feeling forceful or confrontational." },
    { name: "Mad", start: 59.26, end: 68.04, description: "Feeling angry or enraged." },
    { name: "Disrespected", start: 68.04, end: 76.82, description: "Feeling undervalued or insulted." },
    { name: "Let Down", start: 76.82, end: 85.6, description: "Feeling betrayed or disappointed." },
    { name: "Frustrated", start: 85.6, end: 94.38, description: "Feeling blocked or unable to achieve goals." },
    { name: "Lonely", start: 94.38, end: 103.16, description: "Feeling isolated or disconnected." },
    { name: "Numb", start: 103.16, end: 111.94, description: "Feeling emotionally detached." },
    { name: "Sorrow", start: 111.94, end: 120.72, description: "Feeling deep sadness or grief." },
    { name: "Guilty", start: 120.72, end: 129.5, description: "Feeling responsible for wrongdoing." },
    { name: "Depressed", start: 129.5, end: 138.28, description: "Feeling persistently sad or hopeless." },
    { name: "Hurt", start: 138.28, end: 147.06, description: "Feeling emotional pain from rejection or loss." },
    { name: "Worried", start: 147.06, end: 155.84, description: "Feeling uneasy about future problems." },
    { name: "Helpless", start: 155.84, end: 164.62, description: "Feeling powerless to change things." },
    { name: "Rejected", start: 164.62, end: 173.4, description: "Feeling unwanted or dismissed." },
    { name: "Insecure", start: 173.4, end: 182.18, description: "Feeling uncertain about your worth." },
    { name: "Anxious", start: 182.18, end: 190.96, description: "Feeling tense or uneasy." },
    { name: "Fearful", start: 190.96, end: 199.74, description: "Feeling afraid of potential danger." },
    { name: "Contempt", start: 199.74, end: 208.52, description: "Feeling disdainful toward others." },
    { name: "Repelled", start: 208.52, end: 217.3, description: "Feeling disgusted or pushed away." },
    { name: "Disapproving", start: 217.3, end: 226.08, description: "Feeling morally or personally against something." },
    { name: "Disappointed", start: 226.08, end: 234.86, description: "Feeling let down by unmet expectations." },
    { name: "Startled", start: 234.86, end: 243.64, description: "Feeling suddenly surprised or alarmed." },
    { name: "Confused", start: 243.64, end: 252.42, description: "Feeling uncertain or unclear." },
    { name: "Awe", start: 252.42, end: 261.2, description: "Feeling inspired by something vast or powerful." },
    { name: "Excited", start: 261.2, end: 270, description: "Feeling thrilled or eager." },
    ];

const outerCircle = [
    { name: "Inspired", start: 270.00, end: 274.39, description: "Feeling mentally stimulated to create or act." },
    { name: "Valued", start: 274.39, end: 278.78, description: "Feeling appreciated and recognized by others." },
    { name: "Hopeful", start: 278.78, end: 283.17, description: "Feeling optimistic about what is to come." },
    { name: "Loving", start: 283.17, end: 287.56, description: "Feeling deep affection or care for someone or something." },
    { name: "Impassioned", start: 287.56, end: 291.95, description: "Feeling filled with strong emotion or enthusiasm." },
    { name: "Passionate", start: 291.95, end: 296.34, description: "Feeling intense excitement or love toward something." },
    { name: "Energetic", start: 296.34, end: 300.73, description: "Feeling full of energy and vitality." },
    { name: "Successful", start: 300.73, end: 305.12, description: "Feeling accomplished and fulfilled in your goals." },
    { name: "Delighted", start: 305.12, end: 309.51, description: "Feeling greatly pleased or happy." },
    { name: "Amused", start: 309.51, end: 313.90, description: "Feeling entertained or pleasantly surprised." },
    { name: "Courageous", start: 313.90, end: 318.29, description: "Feeling brave and ready to face challenges." },
    { name: "Proud", start: 318.29, end: 322.68, description: "Feeling satisfaction and self-respect for achievements." },
    { name: "Curious", start: 322.68, end: 327.07, description: "Feeling eager to know or learn something new." },
    { name: "Inquisitive", start: 327.07, end: 331.46, description: "Feeling driven to ask questions or investigate." },
    { name: "Cheeky", start: 331.46, end: 335.85, description: "Feeling playfully bold or mischievous." },
    { name: "Aroused", start: 335.85, end: 340.24, description: "Feeling emotionally or physically stimulated." },
    { name: "Powerful", start: 340.24, end: 344.63, description: "Feeling capable, influential, or strong." },
    { name: "Accepted", start: 344.63, end: 349.02, description: "Feeling included and acknowledged by others." },
    { name: "Satisfied", start: 349.02, end: 353.41, description: "Feeling content and fulfilled." },
    { name: "Peaceful", start: 353.41, end: 357.80, description: "Feeling calm and serene." },
    { name: "Ecstatic", start: 357.80, end: 2.19, description: "Feeling overwhelming joy or happiness." },
    { name: "Overjoyed", start: 2.19, end: 6.58, description: "Feeling extremely delighted or happy." },
    { name: "Aggravated", start: 6.58, end: 10.97, description: "Feeling annoyed or made worse by irritation." },
    { name: "Irked", start: 10.97, end: 15.36, description: "Feeling slightly annoyed or irritated." },
    { name: "Annoyed - Furious", start: 15.36, end: 19.75, description: "Feeling increasingly irritated or angry." },
    { name: "Bothered", start: 19.75, end: 24.14, description: "Feeling uneasy or disturbed by something." },
    { name: "Bitter", start: 24.14, end: 28.53, description: "Feeling resentful or holding onto past anger." },
    { name: "Jealous", start: 28.53, end: 32.92, description: "Feeling envious or possessive over something." },
    { name: "Violated", start: 32.92, end: 37.31, description: "Feeling your personal space or trust was broken." },
    { name: "Indignant", start: 37.31, end: 41.70, description: "Feeling anger or resentment toward unfairness." },
    { name: "Dismissive", start: 41.70, end: 46.09, description: "Feeling indifferent or disregarding something." },
    { name: "Skeptical", start: 46.09, end: 50.48, description: "Feeling doubtful or unconvinced." },
    { name: "Hostile", start: 50.48, end: 54.87, description: "Feeling antagonistic or opposed to something." },
    { name: "Provoked", start: 54.87, end: 59.26, description: "Feeling angered or triggered by someone's actions." },
    { name: "Infuriated", start: 59.26, end: 63.65, description: "Feeling furious or beyond irritated." },
    { name: "Mad - Furious", start: 63.65, end: 68.04, description: "Feeling explosively angry or enraged." },
    { name: "Humiliated", start: 68.04, end: 72.43, description: "Feeling ashamed or degraded in front of others." },
    { name: "Ridiculed", start: 72.43, end: 76.82, description: "Feeling mocked or made fun of." },
    { name: "Resentful", start: 76.82, end: 81.21, description: "Feeling bitter about unfair treatment." },
    { name: "Betrayed", start: 81.21, end: 85.60, description: "Feeling let down by someone trusted." },
    { name: "Rageful", start: 85.60, end: 89.99, description: "Feeling explosive anger or fury." },
    { name: "Irate", start: 89.99, end: 94.38, description: "Feeling extremely angry or enraged." },
    { name: "Isolated", start: 94.38, end: 98.77, description: "Feeling alone or cut off from others." },
    { name: "Abandoned", start: 98.77, end: 103.16, description: "Feeling deserted or left behind." },
    { name: "Powerless", start: 103.16, end: 107.55, description: "Feeling unable to affect outcomes." },
    { name: "Empty", start: 107.55, end: 111.94, description: "Feeling hollow or without emotion." },
    { name: "Despair", start: 111.94, end: 116.33, description: "Feeling a total loss of hope." },
    { name: "Grief", start: 116.33, end: 120.72, description: "Feeling deep sorrow due to loss." },
    { name: "Ashamed", start: 120.72, end: 125.11, description: "Feeling embarrassed about your actions or self." },
    { name: "Remorseful", start: 125.11, end: 129.50, description: "Feeling regretful about something wrong done." },
    { name: "Unmotivated", start: 129.50, end: 133.89, description: "Feeling without energy or drive." },
    { name: "Worthless", start: 133.89, end: 138.28, description: "Feeling of having no value or purpose." },
    { name: "Victimized", start: 138.28, end: 142.67, description: "Feeling unfairly harmed or mistreated." },
    { name: "Fragile", start: 142.67, end: 147.06, description: "Feeling emotionally delicate or easily hurt." },
    { name: "Intimidated", start: 147.06, end: 151.45, description: "Feeling fearful or overpowered by someone." },
    { name: "Threatened", start: 151.45, end: 155.84, description: "Feeling unsafe or in danger." },
    { name: "Insignificant", start: 155.84, end: 160.23, description: "Feeling unimportant or small." },
    { name: "Lost", start: 160.23, end: 164.62, description: "Feeling directionless or without clarity." },
    { name: "Persecuted", start: 164.62, end: 169.01, description: "Feeling unfairly attacked or oppressed." },
    { name: "Excluded", start: 169.01, end: 173.40, description: "Feeling left out or rejected." },
    { name: "Inferior", start: 173.40, end: 177.79, description: "Feeling lower in status or ability." },
    { name: "Inadequate", start: 177.79, end: 182.18, description: "Feeling not good enough or insufficient." },
    { name: "Overwhelmed", start: 182.18, end: 186.57, description: "Feeling overcome by stress or emotion." },
    { name: "Panicked", start: 186.57, end: 190.96, description: "Feeling sudden uncontrollable fear." },
    { name: "Nervous", start: 190.96, end: 195.35, description: "Feeling uneasy or tense." },
    { name: "Frightened", start: 195.35, end: 199.74, description: "Feeling afraid of danger or harm." },
    { name: "Scornful", start: 199.74, end: 204.13, description: "Feeling contempt or derision toward others." },
    { name: "Disdain", start: 204.13, end: 208.52, description: "Feeling strong dislike or disrespect." },
    { name: "Nauseated", start: 208.52, end: 212.91, description: "Feeling physically or emotionally sickened." },
    { name: "Horrified", start: 212.91, end: 217.30, description: "Feeling shocked by something terrifying." },
    { name: "Embarrassed", start: 217.30, end: 221.69, description: "Feeling awkward or self-conscious." },
    { name: "Judgemental", start: 221.69, end: 226.08, description: "Feeling critical of others' actions or choices." },
    { name: "Appalled", start: 226.08, end: 230.47, description: "Feeling horrified or offended." },
    { name: "Hesitant", start: 230.47, end: 234.86, description: "Feeling uncertain or reluctant to act." },
    { name: "Moved", start: 234.86, end: 239.25, description: "Feeling emotionally touched or stirred." },
    { name: "Dismayed", start: 239.25, end: 243.64, description: "Feeling disappointed or distressed." },
    { name: "Disillusioned", start: 243.64, end: 248.03, description: "Feeling let down by false beliefs or hopes." },
    { name: "Perplexed", start: 248.03, end: 252.42, description: "Feeling confused or puzzled." },
    { name: "Shocked", start: 252.42, end: 256.81, description: "Feeling stunned or surprised by something unexpected." },
    { name: "Astonished", start: 256.81, end: 261.20, description: "Feeling amazed or taken aback." },
    { name: "Amazed", start: 261.20, end: 265.59, description: "Feeling wonder or admiration for something." },
    { name: "Eager", start: 265.59, end: 270.00, description: "Feeling keen anticipation or excitement." },
];


const Wheel = () => {
    const imgRef = useRef(null);
    const containerRef = useRef(null);
    const [angle, setAngle] = useState(0);
    const [hovered, setHovered] = useState(null);

    const dragging = useRef(false);
    const lastAngle = useRef(0);

    const getAngleFromEvent = (e, rect) => {
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const x = (e.clientX ?? e.touches?.[0].clientX) - cx;
        const y = (e.clientY ?? e.touches?.[0].clientY) - cy;
        return (Math.atan2(y, x) * 180) / Math.PI;
    };

    const handlePointerDown = (e) => {
        e.preventDefault();
        dragging.current = true;
        const rect = containerRef.current.getBoundingClientRect();
        lastAngle.current = getAngleFromEvent(e, rect);
        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);
    };

    const handlePointerUp = () => {
        dragging.current = false;
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
    };

    const handlePointerMove = (e) => {
        if (!dragging.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const a = getAngleFromEvent(e, rect);
        let diff = a - lastAngle.current;
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;
        setAngle((prev) => (prev + diff + 360) % 360);
        lastAngle.current = a;
    };

    const handleMouseMove = (e) => {
        const img = imgRef.current;
        if (!img) return;

        // Center from the *visual* rect (this stays the center even when rotated)
        const rect = img.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        // Mouse vector in screen pixels
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;

        const rad = (-angle * Math.PI) / 180; // inverse rotation
        const ux = dx * Math.cos(rad) - dy * Math.sin(rad);
        const uy = dx * Math.sin(rad) + dy * Math.cos(rad);

        // Distance in screen pixels from the center, but we’ll compare it to
        // radii derived from the layout size, which does NOT change with rotation.
        const dist = Math.hypot(ux, uy);

        // Use layout size (unaffected by transform) so radii do not drift
        const layoutRadius = img.clientWidth / 2;

        const multiRing = 0.24;
        const innerIRadius  = layoutRadius * multiRing * 1;
        const innerORadius  = layoutRadius * multiRing * 2;
        const middleORadius = layoutRadius * multiRing * 3;
        const outerORadius  = layoutRadius * multiRing * 4;

        // Outside the wheel or inside the hole ➜ nothing hovered
        if (dist < innerIRadius || dist >= outerORadius) {
            setHovered(null);
            return;
        }

        // Angle in the upright wheel’s coordinates (0° = right, CCW positive)
        let deg = (Math.atan2(uy, ux) * 180) / Math.PI;
        if (deg < 0) deg += 360;

        const hit = (circle) =>
            circle.find((emo) =>
                emo.start < emo.end
                ? deg >= emo.start && deg < emo.end
                : deg >= emo.start || deg < emo.end
            );

        let hoveredEmotion = null;
        if (dist >= innerIRadius && dist < innerORadius)
            hoveredEmotion = hit(innerCircle);
        else if (dist >= innerORadius && dist < middleORadius)
            hoveredEmotion = hit(middleCircle);
        else if (dist >= middleORadius && dist < outerORadius)
            hoveredEmotion = hit(outerCircle);

        setHovered(hoveredEmotion || null);
    };


    useEffect(() => {
        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
        };
    }, []);

return (
    <div
        ref={containerRef}
        className="wheel-container"
        onPointerDown={handlePointerDown}
        onMouseMove={handleMouseMove}
    >
        <img
        ref={imgRef}
        src={wheelImg}
        alt="Feelings Wheel"
        draggable="false"
        className="wheel-image"
        style={{ transform: `rotate(${angle}deg)` }}
        />

        {hovered && (
        <div className="tooltip">
            <h3>{hovered.name}</h3>
            <p>{hovered.description}</p>
        </div>
        )}
    </div>
    );
};

export default Wheel;
