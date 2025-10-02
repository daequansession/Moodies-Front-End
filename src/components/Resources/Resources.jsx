import "./Resources.css";

const Resources = () => {
  return (
    <div className="resources">
      <h1>Helplines</h1>
      <ul>
        <li>
          <p className="helpline-name">988 Suicide & Crisis Lifeline</p>
          <ul>
            <li>
              Call or text <a href="tel:988">988</a>
            </li>
            <li>
              <a href="https://nyc988.cityofnewyork.us/en/" target="_blank">
                Chat online
              </a>
            </li>
          </ul>
        </li>

        <li>
          <p className="helpline-name">National Crisis Text Line</p>
          <ul>
            <li>
              Text "HOME" to <a href="sms:741-741">741-741</a>
            </li>
          </ul>
        </li>

        <li>
          <p className="helpline-name">
            Human or Natural Disaster Distress Helpline
          </p>
          <ul>
            <li>
              Call or text <a href="tel:1-800-985-5990">1-800-985-5990</a>
            </li>
          </ul>
        </li>

        <li>
          <p className="helpline-name">NAMI's Helpline (M-F 10am-10pm EST)</p>
          <ul>
            <li>
              Call <a href="tel:+1(800)950-6264">1-800-950-6264</a>
            </li>
            <li>
              Text "NAMI" to <a href="sms:62640">62640</a>
            </li>
          </ul>
        </li>

        <li>
          <p className="helpline-name">
            RAINN's National Sexual Assault Helpline
          </p>
          <ul>
            <li>
              Call <a href="tel:+1(800)656-4673">1-800-656-4673</a>
            </li>
            <li>
              Text "HOPE" to <a href="sms:64673">64673</a>
            </li>
            <li>
              <a
                href="https://hotline.rainn.org/online?_ga=2.104531264.1563024983.1754919058-818428162.1691429084"
                target="_blank"
              >
                Chat online
              </a>
            </li>
          </ul>
        </li>

        <li>
          <p className="helpline-name">
            SAMHSA's National Mental Health and Addiction Helpline
          </p>
          <ul>
            <li>
              Call <a href="tel:1-800-662-4357">1-800-662-4357</a>
            </li>
          </ul>
        </li>

        <li>
          <p className="helpline-name">
            The Trevor Project's Helpline for LGBTQ+ Youth
          </p>
          <ul>
            <li>
              Call <a href="tel:1-866-488-7386">1-866-488-7386</a>
            </li>
            <li>
              Text "START" to <a href="sms:678-678">678-678</a>
            </li>
            <li>
              <a
                href="https://www.thetrevorproject.org/get-help/"
                target="_blank"
              >
                Chat online
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Resources;
