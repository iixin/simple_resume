fetch("example.json")
  .then((response) => response.json())
  .then((data) => {
    // 网页标题
    document.title = data.header.name + "的简历";

    // Header
    document.getElementById("name").innerText = data.header.name;
    document.getElementById("email").innerText = data.header.email;
    document.getElementById("email").href = "mailto:" + data.header.email;
    document.getElementById("phone").innerText = data.header.phone;
    document.getElementById("phone").href = "tel:" + data.header.phone;
    document.getElementById("github").innerText = data.header.github;
    document.getElementById("github").href = "https://" + data.header.github;

    // 教育背景
    const educationDiv = document.getElementById("education");
    const eduDiv = document.createElement("div");
    const eduhtml = data.education
      .map(
        (edu) => `
            <div class="info-line">
                <div class="item-name">${edu.university_name}</div>
                <div class="duration">${edu.duration}</div>
            </div>
            <span class="degree">${edu.degree}</span>
            <span class="major">${edu.major}</span>
        `
      )
      .join("");
    eduDiv.innerHTML = eduhtml;
    educationDiv.appendChild(eduDiv);

    // 实习/项目经历
    const experienceDiv = document.getElementById("experience");
    const expDiv = document.createElement("div");
    const exphtml = data.experience
      .map(
        (exp) => `
            <div class="info-line">
                <div class="item-name">${exp.item_name}</div>
                <div class="duration">${exp.duration}</div>
            </div>
            <span class="technology-stack ${
              !exp.technology_stack ? "empty" : ""
            }">${exp.technology_stack}</span>
            <span class="type ${!exp.type ? "empty" : ""}">${exp.type}</span>
            <div class="description">${exp.description}</div>
            <div class="contributions">
                <ul>
                    ${exp.contributions
                      .map((contribution) => `<li>${contribution}</li>`)
                      .join("")}
                </ul>
            </div>
        `
      )
      .join("");
    expDiv.innerHTML = exphtml;
    experienceDiv.appendChild(expDiv);

    // IT技能
    const skillsDiv = document.getElementById("skills");
    const sklDiv = document.createElement("div");
    const sklhtml = data.skills
      .map(
        (skl) => `
                <div class="category-block">
                    <div class="skill-category">${skl.category}</div>
                    <ul>
                        ${skl.details
                          .map((detail) => `<li>${detail}</li>`)
                          .join("")}
                    </ul>
                </div>

            `
      )
      .join("");
    sklDiv.innerHTML = sklhtml;
    sklDiv.id = "skills-content"
    skillsDiv.appendChild(sklDiv);

    // 获奖情况
    const awardsDiv = document.getElementById("awards");
    const awdDiv = document.createElement("div");
    const awdhtml = data.awards
      .map(
        (awd) => `
            <div class="info-line">
                <div class="item-name">${awd.award_name}</div>
                <div class="duration">${awd.time}</div>
            </div>
        `
      )
      .join("");
    awdDiv.innerHTML = awdhtml;
    awardsDiv.appendChild(awdDiv);
  })
  .catch((error) => console.error("Error loading resume data:", error));
