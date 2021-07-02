import Image from "next/image";

import classes from "./hero.module.css";

const Hero = (props) => {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image
                    src="/images/site/max.jpg"
                    alt="An image showing Sayan"
                    width={300}
                    height={300}
                />
            </div>
            <h1>Hi, I`&apos;`m Sayan</h1>
            <p>
                I blog about web development - especially frontend frameworks
                like Angular or React.
            </p>
        </section>
    );
};

export default Hero;
