import { useRef, useState, useEffect } from "react";
import wheelImg from "../../assets/images/FeelingsWheel.png";
import "./Wheel.css";

const innerCircle = [
    { name: "Happy", start: 270, end: 6.59, description: "The feeling of general pleasure, satisfaction, and/or well-being." },
    { name: "Angry", start: 6.59, end: 94.39, description: "The feeling associated with a perceived or realistic violation." },
    { name: "Sad", start: 94.39, end: 147.07, description: "The feeling associated with emotional pain and unhappiness." },
    { name: "Scared", start: 147.07, end: 199.76, description: "The feeling associated to a perceived or realistic threat." },
    { name: "Disgusted", start: 199.76, end: 234.88, description: "The feeling of strong dislike or revulsion toward something unpleasant." },
    { name: "Surprised", start: 234.88, end: 270, description: "The feeling of sudden wonder or astonishement caused by the unexpected." },
];

const middleCircle = [
    { name: "Respected", start: 270.0, end: 278.78, description: "The feeling of being admired and valued by others" },
    { name: "Grateful", start: 278.78, end: 287.56, description: "The feeling of deep appreciate and thankfulness" },
    { name: "Enthusiastic", start: 287.56, end: 296.34, description: "The feeling of eager excitement." },
    { name: "Creative", start: 296.34, end: 305.12, description: "The feeling associated with imagination, inventiveness, and inspiration." },
    { name: "Pleased", start: 305.12, end: 313.9, description: "The feeling of quiet satisfaction and contentment." },
    { name: "Confident", start: 313.9, end: 322.68, description: "The feeling of trust in one's abilities and/or worth." },
    { name: "Interested", start: 322.68, end: 331.46, description: "The feeling of curiosity and desire to engage or learn more." },
    { name: "Playful", start: 331.46, end: 340.24, description: "The feeling of lighthearted fun and amusement." },
    { name: "Trusting", start: 340.24, end: 349.02, description: "The feeling of safety." },
    { name: "Content", start: 349.02, end: 357.8, description: "The feeling of peaceful satisfaction." },
    { name: "Joyful", start: 357.8, end: 6.58, description: "The feeling of great happiness and delight." },
    { name: "Irritable", start: 6.58, end: 15.36, description: "The feeling of being easily annoyed or agitated." },
    { name: "Annoyed", start: 15.36, end: 24.14, description: "The feeling of mild irritation and/or mild frustration." },
    { name: "Envious", start: 24.14, end: 32.92, description: "The feeling of longing for what someone else has." },
    { name: "Bitter", start: 32.92, end: 41.7, description: "The feeling of lasting resentment or hurt." },
    { name: "Critical", start: 41.7, end: 50.48, description: "Feeling judgmental or disapproving." },
    { name: "Aggressive", start: 50.48, end: 59.26, description: "The feeling forceful or confrontational." },
    { name: "Mad", start: 59.26, end: 68.04, description: "The feeling of anger and/or strong irritation." },
    { name: "Disrespected", start: 68.04, end: 76.82, description: "The feeling of being insulted, ignored, and/or undervalued." },
    { name: "Let Down", start: 76.82, end: 85.6, description: "The feeling of disappointment when expectations are not met." },
    { name: "Frustrated", start: 85.6, end: 94.38, description: "The feeling of mild anger." },
    { name: "Lonely", start: 94.38, end: 103.16, description: "The feeling of isolated or disconnected." },
    { name: "Numb", start: 103.16, end: 111.94, description: "The feeling of emotional emptiness or emotional detachment." },
    { name: "Sorrow", start: 111.94, end: 120.72, description: "The feeling of deep sadness or grief." },
    { name: "Guilty", start: 120.72, end: 129.5, description: "The feeling associated with the responsibility of perceived or realistic wrongdoing(s)." },
    { name: "Depressed", start: 129.5, end: 138.28, description: "The feeling of deep and persistant sadness and hopelessness." },
    { name: "Hurt", start: 138.28, end: 147.06, description: "The feeling of emotional pain or injury." },
    { name: "Worried", start: 147.06, end: 155.84, description: "The feeling of anxious concern about something, often something uncertain." },
    { name: "Helpless", start: 155.84, end: 164.62, description: "The feeling associated with being unable to change or control a situation." },
    { name: "Rejected", start: 164.62, end: 173.4, description: "The feeling of being unwanted or dismissed by others." },
    { name: "Insecure", start: 173.4, end: 182.18, description: "The feeling of self-doubt and/or uncertainty about one's abilities or worth." },
    { name: "Anxious", start: 182.18, end: 190.96, description: "The feeling of unease, deep worry, or fear of what may happen." },
    { name: "Fearful", start: 190.96, end: 199.74, description: "The feeling of worry and apprehension about perceived or realistic danger." },
    { name: "Contempt", start: 199.74, end: 208.52, description: "The feeling of disdain and/or lack of respect toward something, often something perceived as inferior." },
    { name: "Repelled", start: 208.52, end: 217.3, description: "The feeling of being pushed away or disgusted by something unpleasant." },
    { name: "Disapproving", start: 217.3, end: 226.08, description: "The feeling of dissatisfaction or objection toward something or someone." },
    { name: "Disappointed", start: 226.08, end: 234.86, description: "The feeling of sadness when expecations are not met." },
    { name: "Startled", start: 234.86, end: 243.64, description: "The feeling of sudden shock or fright from something unexpected." },
    { name: "Confused", start: 243.64, end: 252.42, description: "The feeling of uncertainty or lack of understanding." },
    { name: "Awe", start: 252.42, end: 261.2, description: "The feeling of deep wonder and admiration, often mixed with respect." },
    { name: "Excited", start: 261.2, end: 270, description: "The feeling of increased energy and anticipation about something positive." },
    ];

const outerCircle = [
    { name: "Inspired", start: 270.00, end: 274.39, description: "The feeling of mental or emotional stimulation to act or create." },
    { name: "Valued", start: 274.39, end: 278.78, description: "The feeling of being appreciated and recognized as important." },
    { name: "Hopeful", start: 278.78, end: 283.17, description: "The feeling of optimism and belief in positive outcomes." },
    { name: "Loving", start: 283.17, end: 287.56, description: "The feeling of deep affection, care, or tenderness toward someone." },
    { name: "Impassioned", start: 287.56, end: 291.95, description: "The feeling of being moved by intense emotion and/or conviction." },
    { name: "Passionate", start: 291.95, end: 296.34, description: "The feeling of deep enthusiasm or strong emotion." },
    { name: "Energetic", start: 296.34, end: 300.73, description: "The feeling of being lively, active, and full of vitality." },
    { name: "Successful", start: 300.73, end: 305.12, description: "The feeling associated with positive accomplishment and achievement." },
    { name: "Delighted", start: 305.12, end: 309.51, description: "The feeling of great pleasure and/or satisfaction." },
    { name: "Amused", start: 309.51, end: 313.90, description: "The feeling of mild enjoyment." },
    { name: "Courageous", start: 313.90, end: 318.29, description: "The feeling of bracey in facing fear or difficulty." },
    { name: "Proud", start: 318.29, end: 322.68, description: "The feeling of satisfaction in one's self and/or achievements." },
    { name: "Curious", start: 322.68, end: 327.07, description: "The feeling of wanting to explore, understand, or investigate something new." },
    { name: "Inquisitive", start: 327.07, end: 331.46, description: "The feeling of strong desire to explore, understand, or investigate something new." },
    { name: "Cheeky", start: 331.46, end: 335.85, description: "The feeling of playful boldness or lighthearted mischief." },
    { name: "Aroused", start: 335.85, end: 340.24, description: "The feeling of emotionally or physically stimulation." },
    { name: "Powerful", start: 340.24, end: 344.63, description: "The feeling of strength and confidence." },
    { name: "Accepted", start: 344.63, end: 349.02, description: "The feeling of belonging and being welcomed." },
    { name: "Satisfied", start: 349.02, end: 353.41, description: "The feeling of fulfillment after needs and/or expectations are met." },
    { name: "Peaceful", start: 353.41, end: 357.80, description: "The feeling of calmness and tranquility." },
    { name: "Ecstatic", start: 357.80, end: 2.19, description: "The feeling of overwhelming excitement and/or bliss." },
    { name: "Overjoyed", start: 2.19, end: 6.58, description: "The feeling of intense joy and happiness." },
    { name: "Aggravated", start: 6.58, end: 10.97, description: "The feeling of increasing irriation and frustration." },
    { name: "Irked", start: 10.97, end: 15.36, description: "The feeling of slight annoyance and/or irritation." },
    { name: "Fuming", start: 15.36, end: 19.75, description: "The feeling of intense anger and/or irritation that is difficult to contain." },
    { name: "Bothered", start: 19.75, end: 24.14, description: "The feeling of mild irration or annoyance." },
    { name: "Bitter", start: 24.14, end: 28.53, description: "The feeling of lasting mild anger or resentment." },
    { name: "Jealous", start: 28.53, end: 32.92, description: "The feeling of envy or fear of losing someone or something." },
    { name: "Violated", start: 32.92, end: 37.31, description: "The feeling of being disrespected and/or having personal boundaries crossed." },
    { name: "Indignant", start: 37.31, end: 41.70, description: "The feeling of anger at perceived injustice or unfairness" },
    { name: "Dismissive", start: 41.70, end: 46.09, description: "The feeling of rejecting or miniming something or someone's importance." },
    { name: "Skeptical", start: 46.09, end: 50.48, description: "The feeling of doubt or mistrust towards someone, information, and/or motives." },
    { name: "Hostile", start: 50.48, end: 54.87, description: "The feeling associated with being unfriendly and/or antagonistic towards someone." },
    { name: "Provoked", start: 54.87, end: 59.26, description: "The feeling of anger or irritation in response to someone's actions." },
    { name: "Infuriated", start: 59.26, end: 63.65, description: "The feeling of being made intensly anger." },
    { name: "Furious", start: 63.65, end: 68.04, description: "The feeling of being intensly angry or enraged." },
    { name: "Humiliated", start: 68.04, end: 72.43, description: "The feeling of deep shame and/or loss of dignity." },
    { name: "Ridiculed", start: 72.43, end: 76.82, description: "The feeling of being mocked or made fun of." },
    { name: "Resentful", start: 76.82, end: 81.21, description: "The feeling of bitterness over being wronged or treated unfairly." },
    { name: "Betrayed", start: 81.21, end: 85.60, description: "The feeling of deep hurt from broken trust." },
    { name: "Rageful", start: 85.60, end: 89.99, description: "The feeling of intense, often uncontrollable, and often violent anger." },
    { name: "Irate", start: 89.99, end: 94.38, description: "The feeling of deep anger or fury." },
    { name: "Isolated", start: 94.38, end: 98.77, description: "The feeling of being separated of cut off from others." },
    { name: "Abandoned", start: 98.77, end: 103.16, description: "The feeling of being left alone." },
    { name: "Powerless", start: 103.16, end: 107.55, description: "The feeling of lacking control or influence." },
    { name: "Empty", start: 107.55, end: 111.94, description: "The feeling of emotional hollowness and/or lack of fulfillment." },
    { name: "Despair", start: 111.94, end: 116.33, description: "The feeling of intense hopelessness and/or defeat." },
    { name: "Grief", start: 116.33, end: 120.72, description: "The feeling of deep sorrow after a loss." },
    { name: "Ashamed", start: 120.72, end: 125.11, description: "The feeling of humiliation or guilt from one's actions or traits." },
    { name: "Remorseful", start: 125.11, end: 129.50, description: "The feeling of deep regret or guilt from one's actions or oneself." },
    { name: "Unmotivated", start: 129.50, end: 133.89, description: "The feeling of lacking drive, energy, and/or purpose." },
    { name: "Worthless", start: 133.89, end: 138.28, description: "The feeling of having no value or significance." },
    { name: "Victimized", start: 138.28, end: 142.67, description: "The feeling of being wronged, harmed, and/or taken advantage of." },
    { name: "Fragile", start: 142.67, end: 147.06, description: "The feeling of emotional vulnerability and sensitivity." },
    { name: "Intimidated", start: 147.06, end: 151.45, description: "The feeling of fear or insecurity caused by someone's power or presence." },
    { name: "Threatened", start: 151.45, end: 155.84, description: "The feeling associated with the fear of potential harm or danger." },
    { name: "Insignificant", start: 155.84, end: 160.23, description: "The feeling of being unimportant, undervalued, or unnoticed." },
    { name: "Lost", start: 160.23, end: 164.62, description: "The feeling of confusion or lack of direction or purpose." },
    { name: "Persecuted", start: 164.62, end: 169.01, description: "The feeling of being unfairly targeted or mistreated." },
    { name: "Excluded", start: 169.01, end: 173.40, description: "The feeling of being left out or unwelcomed." },
    { name: "Inferior", start: 173.40, end: 177.79, description: "The feeling of being less worth or competent than others." },
    { name: "Inadequate", start: 177.79, end: 182.18, description: "The feeling of not being good or capable enough." },
    { name: "Overwhelmed", start: 182.18, end: 186.57, description: "The feeling of being unable to manage too many emotions and/or demands." },
    { name: "Panicked", start: 186.57, end: 190.96, description: "The feeling of sudden, overwhelming fear and/or anxiety." },
    { name: "Nervous", start: 190.96, end: 195.35, description: "The feeling of unease and/or anxious anticipation." },
    { name: "Frightened", start: 195.35, end: 199.74, description: "The feeling of fear and anxiety, often due to something that has just happened or may happen." },
    { name: "Scornful", start: 199.74, end: 204.13, description: "The feeling of open dislike or mockery toward something or someone." },
    { name: "Disdain", start: 204.13, end: 208.52, description: "The feeling of strong dislike, contempt, or disrespect." },
    { name: "Nauseated", start: 208.52, end: 212.91, description: "The feeling of physical disgust or queasiness." },
    { name: "Horrified", start: 212.91, end: 217.30, description: "The feeling of deep fear and/or shock." },
    { name: "Embarrassed", start: 217.30, end: 221.69, description: "The feeling of self-conscious discomfort and/or awkwardness." },
    { name: "Judgemental", start: 221.69, end: 226.08, description: "The feeling of critical disapproval towards others." },
    { name: "Appalled", start: 226.08, end: 230.47, description: "The feeling of shock and disgust at something offensive and/or wrong." },
    { name: "Hesitant", start: 230.47, end: 234.86, description: "The feeling of being uncertain or reluctant to act." },
    { name: "Moved", start: 234.86, end: 239.25, description: "The feeling of being emotionally touched or affected." },
    { name: "Dismayed", start: 239.25, end: 243.64, description: "The feeling of sudden distress or disappointment." },
    { name: "Disillusioned", start: 243.64, end: 248.03, description: "The feeling of disappointment after discovering something is not as positive as believed." },
    { name: "Perplexed", start: 248.03, end: 252.42, description: "The feeling of moderate confusion or uncertainty." },
    { name: "Shocked", start: 252.42, end: 256.81, description: "The feeling of sudden and intense surprise or disturbance." },
    { name: "Astonished", start: 256.81, end: 261.20, description: "The feeling of great surprise or disbelief." },
    { name: "Amazed", start: 261.20, end: 265.59, description: "The feeling of wonder and/or admiration in response to something surprising." },
    { name: "Eager", start: 265.59, end: 270.00, description: "The feeling of excited readiness or anticipation." },
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

        // Center from the visual rect (this stays the center even when rotated)
        const rect = img.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        // Mouse vector in screen pixels
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;

        const rad = (-angle * Math.PI) / 180; // inverse rotation
        const ux = dx * Math.cos(rad) - dy * Math.sin(rad);
        const uy = dx * Math.sin(rad) + dy * Math.cos(rad);

        // Distance in screen pixels from the center, compare it to
        // radii from the layout size, which does NOT change with rotation.
        const dist = Math.hypot(ux, uy);

        // Use layout size (unaffected by transform) so radii do not drift
        const layoutRadius = img.clientWidth / 2;

        const multiRing = 0.24;
        const innerIRadius  = layoutRadius * multiRing * 1;
        const innerORadius  = layoutRadius * multiRing * 2;
        const middleORadius = layoutRadius * multiRing * 3;
        const outerORadius  = layoutRadius * multiRing * 4;

        // Outside the wheel or inside the hole -> nothing hovered
        if (dist < innerIRadius || dist >= outerORadius) {
            setHovered(null);
            return;
        }

        // Angle in the upright wheel's coordinates (0 degrees means it's pointing right, CCW positive)
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
