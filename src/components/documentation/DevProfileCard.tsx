import React from "react";
import { Github, Linkedin } from "lucide-react";

export type DevProfileCardProps = {
  name: string;
  role: string;
  photo?: string;
  github?: string;
  linkedin?: string;
};

export default function DevProfileCard({
  name,
  role,
  photo,
  github,
  linkedin,
}: DevProfileCardProps) {
  return (
    <div className="devcard-main">
      <div className="devcard-card">
        <div className="devcard-info">
          <div className="devcard-avatar">
            {photo ? (
              <img
                src={photo}
                alt={`${name} avatar`}
                className="devcard-avatar-img"
              />
            ) : (
              <svg
                viewBox="0 0 24 24"
                aria-hidden
                className="devcard-avatar-fallback"
              >
                <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" />
              </svg>
            )}
          </div>
          <div className="devcard-title">{name}</div>
          <div className="devcard-subtitle">{role}</div>

          <ul className="devcard-social">
            {github && (
              <li className="devcard-social-icon">
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${name} GitHub`}
                >
                  <Github size={20} />
                </a>
              </li>
            )}
            {linkedin && (
              <li className="devcard-social-icon">
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${name} LinkedIn`}
                >
                  <Linkedin size={20} />
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

