/*React*/
import { useEffect, useState } from "react";
/*Components*/
import CustomIcon from "@common/CustomIcon";
import DescriptionCard from "@common/DescriptionCard/DescriptionCard";
import ProjectCard from "@common/FeaturedProjectCard/FeaturedProjectCard";
/* Icons */
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import {
  BiLogoGithub,
  BiLogoLinkedinSquare,
  BiLogoTelegram,
  BiLogoGmail,
} from "react-icons/bi";
import { Link } from "react-router-dom";
/*Types*/
import { ProjectName } from "@models/index";
/*Context*/
import { useAppContext } from "@context/AppContext";
/* Framer */
import { motion } from "framer-motion";

interface HeroCard {
  title: string;
  description: string;
  link: string;
  logo: string;
  techIcon: JSX.Element;
  date: string;
  institution: string;
}

interface IndexBounderies {
  indexMin: number;
  indexMax: number;
}

const socialMediaIcons: { icon: JSX.Element; link: string }[] = [
  {
    icon: <BiLogoGithub />,
    link: "https://github.com/manuelard13",
  },
  {
    icon: <BiLogoLinkedinSquare />,
    link: "https://www.linkedin.com/in/manuelard13/",
  },
  {
    icon: <BiLogoGmail />,
    link: "mailto:duranalejandro661@gmail",
  },
  {
    icon: <BiLogoTelegram />,
    link: "https://t.me/ManuelARD13",
  },
];

function Hero({ cards }: { cards: HeroCard[] }) {
  const { skills, lenguage } = useAppContext();
  const [indexBounderies, setIndexBounderies] = useState<IndexBounderies>({
    indexMin: 0,
    indexMax: 2,
  });
  const [slicedCards, setSlicedCards] = useState(cards.slice(1, 3));

  useEffect(() => {
    const changeSlide = () => {
      if (indexBounderies.indexMax < cards.length) {
        setIndexBounderies({
          ...indexBounderies,
          indexMin: indexBounderies.indexMin + 2,
          indexMax: indexBounderies.indexMax + 2,
        });
      } else {
        setIndexBounderies({
          ...indexBounderies,
          indexMin: 0,
          indexMax: 2,
        });
      }
    };
    const interval = setInterval(() => {
      changeSlide();
    }, 2500);
    return () => clearInterval(interval);
  }, [indexBounderies, cards.length]);

  useEffect(() => {
    setSlicedCards(
      cards.slice(indexBounderies.indexMin, indexBounderies.indexMax)
    );
  }, [indexBounderies, cards]);

  return (
    <section className="hero">
      <div className="hero__header">
        <motion.aside
          initial={{ opacity: 0, x: -300 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75 }}
          className="hero__features rounded-corners box-shadow"
        >
          <h3 className="hero__features-title">
            {lenguage === "en" && "Main Skills"}
            {lenguage === "es" && "Habilidades"}
          </h3>
          <div className="hero__features-top">
            <p>
              {lenguage === "en" &&
                "+2 Years Experience in Front end Development Technologies:"}
              {lenguage === "es" &&
                "+2 Años de Experiencia como Desarrollador Front end"}
            </p>
          </div>
          <ul className="hero__features-list">
            {skills.map((skill) => (
              <li
                key={skill.title + Math.random()}
                className="hero__features-item"
              >
                <div className="hero__features-icon">
                  <CustomIcon>{skill.icon}</CustomIcon>
                </div>
                <p>{skill.title}</p>
                <div className="hero__features-arrow">
                  <MdKeyboardDoubleArrowRight />
                </div>
              </li>
            ))}
          </ul>
          <Link to="/academics" className="hero__features-bottom">
            {lenguage === "en" && "Explore More"}
            {lenguage === "es" && "Conocer Mas"}
          </Link>
        </motion.aside>
        <div className="hero__img rounded-corners box-shadow">
          <motion.div
            initial={{ opacity: 0, y: -300 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="hero__img-social-media"
          >
            {socialMediaIcons.map(({ icon, link }) => (
              <a href={link} target="_blank" key={link}>
                <CustomIcon color="#FAFAFA">{icon}</CustomIcon>
              </a>
            ))}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -300 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="hero__img-title"
          >
            Manuel <br /> Rojas Duran
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -300 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="hero__img-subtitle"
          >
            Front-end Engineer
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: -300 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            href="#about"
          >
            <motion.button
              initial={{ opacity: 0, y: -300 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75 }}
              className="hero__img-button"
            >
              {lenguage === "en" && "My Experience"}
              {lenguage === "es" && "Mi Experiencia"}
            </motion.button>
          </motion.a>
          <motion.a
            initial={{ opacity: 0, y: -300 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            href="#projects"
            className="hero__img-link"
          >
            {lenguage === "en" && "Live Projects"}
            {lenguage === "es" && "Mis Proyectos"}{" "}
            {<MdKeyboardDoubleArrowRight />}
          </motion.a>
        </div>
      </div>
      <div className="hero__cards-container">
        <div className="hero__cards-container-left rounded-corners box-shadow">
          <ProjectCard projectName={ProjectName.JapaneseLearningApp} />
        </div>
        <div className="hero__cards-container-right">
          {slicedCards.map((card, index) => (
            <DescriptionCard
              key={card.description + `${index}`}
              className="hero__card rounded-corners box-shadow"
              cardInfo={card}
            />
          ))}
          <div className="hero-cards__slider-markers">
            {cards.slice(0, 20).map((_card, index) => {
              return (
                <div
                  key={index}
                  className={`hero-cards__slider-marker box-shadow}
                       ${
                         index < indexBounderies.indexMax &&
                         index >= indexBounderies.indexMin
                           ? "active"
                           : ""
                       }`}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
