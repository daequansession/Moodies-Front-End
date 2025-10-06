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
  { name: "Respected", start: 270.00, end: 278.78, description: "Feeling valued and honored by others." },
  { name: "Grateful", start: 278.78, end: 287.56, description: "Feeling thankful and appreciative." },
  { name: "Enthusiastic", start: 287.56, end: 296.34, description: "Feeling excited and eager to engage." },
  { name: "Creative", start: 296.34, end: 305.12, description: "Feeling imaginative and inspired." },
  { name: "Pleased", start: 305.12, end: 313.90, description: "Feeling satisfied and content." },
  { name: "Confident", start: 313.90, end: 322.68, description: "Feeling sure of yourself and your abilities." },
  { name: "Interested", start: 322.68, end: 331.46, description: "Feeling curious and engaged." },
  { name: "Playful", start: 331.46, end: 340.24, description: "Feeling lighthearted and fun." },
  { name: "Trusting", start: 340.24, end: 349.02, description: "Feeling secure relying on others." },
  { name: "Content", start: 349.02, end: 357.80, description: "Feeling calm satisfaction and peace." },
  { name: "Joyful", start: 357.80, end: 6.58, description: "Feeling full of happiness and delight." },
  { name: "Irritable", start: 6.58, end: 15.36, description: "Feeling easily annoyed or agitated." },
  { name: "Annoyed", start: 15.36, end: 24.14, description: "Feeling mildly bothered or exasperated." },
  { name: "Envious", start: 24.14, end: 32.92, description: "Feeling jealous of others' advantages." },
  { name: "Bitter", start: 32.92, end: 41.70, description: "Feeling resentful or holding onto anger." },
  { name: "Critical", start: 41.70, end: 50.48, description: "Feeling judgmental or disapproving." },
  { name: "Aggressive", start: 50.48, end: 59.26, description: "Feeling forceful or confrontational." },
  { name: "Mad", start: 59.26, end: 68.04, description: "Feeling angry or enraged." },
  { name: "Disrespected", start: 68.04, end: 76.82, description: "Feeling undervalued or insulted." },
  { name: "Let Down", start: 76.82, end: 85.60, description: "Feeling betrayed or disappointed." },
  { name: "Frustrated", start: 85.60, end: 94.38, description: "Feeling blocked or unable to achieve goals." },
  { name: "Lonely", start: 94.38, end: 103.16, description: "Feeling isolated or disconnected." },
  { name: "Numb", start: 103.16, end: 111.94, description: "Feeling emotionally detached." },
  { name: "Sorrow", start: 111.94, end: 120.72, description: "Feeling deep sadness or grief." },
  { name: "Guilty", start: 120.72, end: 129.50, description: "Feeling responsible for wrongdoing." },
  { name: "Depressed", start: 129.50, end: 138.28, description: "Feeling persistently sad or hopeless." },
  { name: "Hurt", start: 138.28, end: 147.06, description: "Feeling emotional pain from rejection or loss." },
  { name: "Worried", start: 147.06, end: 155.84, description: "Feeling uneasy about future problems." },
  { name: "Helpless", start: 155.84, end: 164.62, description: "Feeling powerless to change things." },
  { name: "Rejected", start: 164.62, end: 173.40, description: "Feeling unwanted or dismissed." },
  { name: "Insecure", start: 173.40, end: 182.18, description: "Feeling uncertain about your worth." },
  { name: "Anxious", start: 182.18, end: 190.96, description: "Feeling tense or uneasy." },
  { name: "Fearful", start: 190.96, end: 199.74, description: "Feeling afraid of potential danger." },
  { name: "Contempt", start: 199.74, end: 208.52, description: "Feeling disdainful toward others." },
  { name: "Repelled", start: 208.52, end: 217.30, description: "Feeling disgusted or pushed away." },
  { name: "Disapproving", start: 217.30, end: 226.08, description: "Feeling morally or personally against something." },
  { name: "Disappointed", start: 226.08, end: 234.86, description: "Feeling let down by unmet expectations." },
  { name: "Startled", start: 234.86, end: 243.64, description: "Feeling suddenly surprised or alarmed." },
  { name: "Confused", start: 243.64, end: 252.42, description: "Feeling uncertain or unclear." },
  { name: "Awe", start: 252.42, end: 261.20, description: "Feeling inspired by something vast or powerful." },
  { name: "Excited", start: 261.20, end: 270, description: "Feeling thrilled or eager." },
];

const outerCircle = [
  { name: "Inspired", start: 270.00, end: 274.44, description: "Feeling mentally stimulated to create or act." },
  { name: "Valued", start: 274.44, end: 278.89, description: "Feeling appreciated and recognized by others." },
  { name: "Hopeful", start: 278.89, end: 283.33, description: "Feeling optimistic about what is to come." },
  { name: "Loving", start: 283.33, end: 287.78, description: "Feeling deep affection or care for someone or something." },
  { name: "Impassioned", start: 287.78, end: 292.22, description: "Feeling filled with strong emotion or enthusiasm." },
  { name: "Passionate", start: 292.22, end: 296.67, description: "Feeling intense excitement or love toward something." },
  { name: "Energetic", start: 296.67, end: 301.11, description: "Feeling full of energy and vitality." },
  { name: "Successful", start: 301.11, end: 305.56, description: "Feeling accomplished and fulfilled in your goals." },
  { name: "Delighted", start: 305.56, end: 310.00, description: "Feeling greatly pleased or happy." },
  { name: "Amused", start: 310.00, end: 314.44, description: "Feeling entertained or pleasantly surprised." },
  { name: "Courageous", start: 314.44, end: 318.89, description: "Feeling brave and ready to face challenges." },
  { name: "Proud", start: 318.89, end: 323.33, description: "Feeling satisfaction and self-respect for achievements." },
  { name: "Curious", start: 323.33, end: 327.78, description: "Feeling eager to know or learn something new." },
  { name: "Inquisitive", start: 327.78, end: 332.22, description: "Feeling driven to ask questions or investigate." },
  { name: "Cheeky", start: 332.22, end: 336.67, description: "Feeling playfully bold or mischievous." },
  { name: "Aroused", start: 336.67, end: 341.11, description: "Feeling emotionally or physically stimulated." },
  { name: "Powerful", start: 341.11, end: 345.56, description: "Feeling capable, influential, or strong." },
  { name: "Accepted", start: 345.56, end: 350.00, description: "Feeling included and acknowledged by others." },
  { name: "Satisfied", start: 350.00, end: 354.44, description: "Feeling content and fulfilled." },
  { name: "Peaceful", start: 354.44, end: 358.89, description: "Feeling calm and serene." },
  { name: "Ecstatic", start: 358.89, end: 3.33, description: "Feeling overwhelming joy or happiness." },
  { name: "Overjoyed", start: 3.33, end: 7.78, description: "Feeling extremely delighted or happy." },
  { name: "Aggravated", start: 7.78, end: 12.22, description: "Feeling annoyed or made worse by irritation." },
  { name: "Irked", start: 12.22, end: 16.67, description: "Feeling slightly annoyed or irritated." },
  { name: "Furious", start: 16.67, end: 21.11, description: "Feeling extremely angry or enraged." },
  { name: "Bothered", start: 21.11, end: 25.56, description: "Feeling uneasy or disturbed by something." },
  { name: "Bitter", start: 25.56, end: 30.00, description: "Feeling resentful or holding onto past anger." },
  { name: "Jealous", start: 30.00, end: 34.44, description: "Feeling envious or possessive over something." },
  { name: "Violated", start: 34.44, end: 38.89, description: "Feeling your personal space or trust was broken." },
  { name: "Indignant", start: 38.89, end: 43.33, description: "Feeling anger or resentment toward unfairness." },
  { name: "Dismissive", start: 43.33, end: 47.78, description: "Feeling indifferent or disregarding something." },
  { name: "Skeptical", start: 47.78, end: 52.22, description: "Feeling doubtful or unconvinced." },
  { name: "Hostile", start: 52.22, end: 56.67, description: "Feeling antagonistic or opposed to something." },
  { name: "Provoked", start: 56.67, end: 61.11, description: "Feeling angered or triggered by someone’s actions." },
  { name: "Infuriated", start: 61.11, end: 65.56, description: "Feeling furious or beyond irritated." },
  { name: "Humiliated", start: 65.56, end: 70.00, description: "Feeling ashamed or degraded in front of others." },
  { name: "Ridiculed", start: 70.00, end: 74.44, description: "Feeling mocked or made fun of." },
  { name: "Resentful", start: 74.44, end: 78.89, description: "Feeling bitter about unfair treatment." },
  { name: "Betrayed", start: 78.89, end: 83.33, description: "Feeling let down by someone trusted." },
  { name: "Rageful", start: 83.33, end: 87.78, description: "Feeling explosive anger or fury." },
  { name: "Irate", start: 87.78, end: 92.22, description: "Feeling extremely angry or enraged." },
  { name: "Isolated", start: 92.22, end: 96.67, description: "Feeling alone or cut off from others." },
  { name: "Abandoned", start: 96.67, end: 101.11, description: "Feeling deserted or left behind." },
  { name: "Powerless", start: 101.11, end: 105.56, description: "Feeling unable to affect outcomes." },
  { name: "Empty", start: 105.56, end: 110.00, description: "Feeling hollow or without emotion." },
  { name: "Despair", start: 110.00, end: 114.44, description: "Feeling a total loss of hope." },
  { name: "Grief", start: 114.44, end: 118.89, description: "Feeling deep sorrow due to loss." },
  { name: "Ashamed", start: 118.89, end: 123.33, description: "Feeling embarrassed about your actions or self." },
  { name: "Remorseful", start: 123.33, end: 127.78, description: "Feeling regretful about something wrong done." },
  { name: "Unmotivated", start: 127.78, end: 132.22, description: "Feeling without energy or drive." },
  { name: "Worthless", start: 132.22, end: 136.67, description: "Feeling of having no value or purpose." },
  { name: "Victimized", start: 136.67, end: 141.11, description: "Feeling unfairly harmed or mistreated." },
  { name: "Fragile", start: 141.11, end: 145.56, description: "Feeling emotionally delicate or easily hurt." },
  { name: "Intimidated", start: 145.56, end: 150.00, description: "Feeling fearful or overpowered by someone." },
  { name: "Threatened", start: 150.00, end: 154.44, description: "Feeling unsafe or in danger." },
  { name: "Insignificant", start: 154.44, end: 158.89, description: "Feeling unimportant or small." },
  { name: "Lost", start: 158.89, end: 163.33, description: "Feeling directionless or without clarity." },
  { name: "Persecuted", start: 163.33, end: 167.78, description: "Feeling unfairly attacked or oppressed." },
  { name: "Excluded", start: 167.78, end: 172.22, description: "Feeling left out or rejected." },
  { name: "Inferior", start: 172.22, end: 176.67, description: "Feeling lower in status or ability." },
  { name: "Inadequate", start: 176.67, end: 181.11, description: "Feeling not good enough or insufficient." },
  { name: "Overwhelmed", start: 181.11, end: 185.56, description: "Feeling overcome by stress or emotion." },
  { name: "Panicked", start: 185.56, end: 190.00, description: "Feeling sudden uncontrollable fear." },
  { name: "Nervous", start: 190.00, end: 194.44, description: "Feeling uneasy or tense." },
  { name: "Frightened", start: 194.44, end: 198.89, description: "Feeling afraid of danger or harm." },
  { name: "Scornful", start: 198.89, end: 203.33, description: "Feeling contempt or derision toward others." },
  { name: "Disdain", start: 203.33, end: 207.78, description: "Feeling strong dislike or disrespect." },
  { name: "Nauseated", start: 207.78, end: 212.22, description: "Feeling physically or emotionally sickened." },
  { name: "Horrified", start: 212.22, end: 216.67, description: "Feeling shocked by something terrifying." },
  { name: "Embarrassed", start: 216.67, end: 221.11, description: "Feeling awkward or self-conscious." },
  { name: "Judgemental", start: 221.11, end: 225.56, description: "Feeling critical of others' actions or choices." },
  { name: "Appalled", start: 225.56, end: 230.00, description: "Feeling horrified or offended." },
  { name: "Hesitant", start: 230.00, end: 234.44, description: "Feeling uncertain or reluctant to act." },
  { name: "Moved", start: 234.44, end: 238.89, description: "Feeling emotionally touched or stirred." },
  { name: "Dismayed", start: 238.89, end: 243.33, description: "Feeling disappointed or distressed." },
  { name: "Disillusioned", start: 243.33, end: 247.78, description: "Feeling let down by false beliefs or hopes." },
  { name: "Perplexed", start: 247.78, end: 252.22, description: "Feeling confused or puzzled." },
  { name: "Shocked", start: 252.22, end: 256.67, description: "Feeling stunned or surprised by something unexpected." },
  { name: "Astonished", start: 256.67, end: 261.11, description: "Feeling amazed or taken aback." },
  { name: "Amazed", start: 261.11, end: 265.56, description: "Feeling wonder or admiration for something." },
  { name: "Eager", start: 265.56, end: 270.00, description: "Feeling keen anticipation or excitement." },
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

  const handlePointerUp = () => {
    dragging.current = false;
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);
  };

  const handleMouseMove = (e) => {
    const rect = imgRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const x = e.clientX - cx;
    const y = e.clientY - cy;
    let dist = Math.sqrt(x * x + y * y);
    const scale = Math.min(rect.width, rect.height) / 500;
    dist = dist / scale;

    const pixelsPerRadius = 60;
    const innerIRadius = pixelsPerRadius * 1;
    const innerORadius = pixelsPerRadius * 2;
    const middleORadius = pixelsPerRadius * 3;
    const outerORadius = pixelsPerRadius * 4;

    if (dist < innerIRadius || dist >= outerORadius) {
      setHovered(null);
      return;
    }

    let deg = (Math.atan2(y, x) * 180) / Math.PI;
    if (deg < 0) deg += 360;
    deg = (deg - angle + 360) % 360;

    const getHoveredEmotion = (circle, deg) =>
      circle.find((emo) =>
        emo.start < emo.end
          ? deg >= emo.start && deg < emo.end
          : deg >= emo.start || deg < emo.end
      );

    let hoveredEmotion;
    if (dist >= innerIRadius && dist < innerORadius)
      hoveredEmotion = getHoveredEmotion(innerCircle, deg);
    else if (dist >= innerORadius && dist < middleORadius)
      hoveredEmotion = getHoveredEmotion(middleCircle, deg);
    else if (dist >= middleORadius && dist < outerORadius)
      hoveredEmotion = getHoveredEmotion(outerCircle, deg);

    setHovered(hoveredEmotion);
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
