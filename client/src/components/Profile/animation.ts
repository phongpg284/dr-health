const fast = 300
const superfast = 200

export function handleClickDropDown() {
    document.querySelector(".profile_pops_up")?.classList.toggle("profile_hidden")
}

export function handleClickBodyBaseInfoButton() {
    document.querySelector(".profile_line_choose")?.classList.remove("profile_line_choose_toggle")
    document.querySelector(".profile_contentinfo_carry")?.classList.remove("profile_contentinfo_switchphase")

    document.querySelector(".profile_contentinfo_patient")?.setAttribute("style", `max-height: 0px;`)
    document.querySelector(".profile_contentinfo_carry")?.setAttribute("style", `height:calc(${document.querySelector(".profile_contentinfo_carry_phase_1")?.clientHeight}px + 40px)`)

    document.querySelectorAll(".profile_cb_text").forEach((element, i) => {
        setTimeout(() => {
            element?.classList.remove("profile_cb_text_toggle")
        }, superfast + 50 * i);
    })

    document.querySelectorAll(".profile_cp_item").forEach((element) => {
        element?.classList.remove("profile_cp_item_toggle")
    })
}

export function handleClickBodyReflecterButton() {
    document.querySelector(".profile_line_choose")?.classList.add("profile_line_choose_toggle")
    document.querySelector(".profile_contentinfo_carry")?.classList.add("profile_contentinfo_switchphase")

    document.querySelector(".profile_contentinfo_patient")?.setAttribute("style", `max-height: 490px;`)
    document.querySelector(".profile_contentinfo_carry")?.setAttribute("style", `height:calc(${document.querySelector(".profile_contentinfo_carry_phase_2")?.clientHeight}px + 40px)`)

    document.querySelectorAll(".profile_cb_text").forEach((element) => {
        element?.classList.add("profile_cb_text_toggle")
    })

    document.querySelectorAll(".profile_cp_item").forEach((element, i) => {
        setTimeout(() => {
            element?.classList.add("profile_cp_item_toggle")
        }, superfast + 50 * i);
    })
}

export function handleClickBodyCalender() {
    //buton
    document.querySelector(".profile_body_calendar")?.classList.add("profile_calendar_toggle")
    document.querySelector(".profile_body_recorder")?.classList.remove("profile_recorder_toggle")
    //height
    document.querySelector(".profile_contentextension_item_phase")?.setAttribute("style", `height:calc(${document.querySelector(".profile_contentextension_item_recordsphase_content")?.clientHeight}px + 20px)`)
    setTimeout(() => {
        document.querySelector(".profile_contentextension_item_phase")?.setAttribute("style", `height:calc(${document.querySelector(".profile_contentextension_item_calenderphase_content")?.clientHeight}px + 20px);background-color:#12bbcc;`)
        //opacity
        document.querySelector(".profile_contentextension_item_calenderphase_content")?.classList.remove("profile_contentextension_switchphase")
        document.querySelector(".profile_contentextension_item_recordsphase_content")?.classList.add("profile_contentextension_switchphase")
    }, 10);
    setTimeout(() => {
        document.querySelector(".profile_content_extension_carry_content")?.setAttribute("style", `height:auto`)
    }, fast + 10);

}

export function handleClickBodyRecorder() {
    //button
    document.querySelector(".profile_body_calendar")?.classList.remove("profile_calendar_toggle")
    document.querySelector(".profile_body_recorder")?.classList.add("profile_recorder_toggle")
    //height
    document.querySelector(".profile_contentextension_item_phase")?.setAttribute("style", `height:calc(${document.querySelector(".profile_contentextension_item_calenderphase_content")?.clientHeight}px + 20px)`)
    setTimeout(() => {
        document.querySelector(".profile_contentextension_item_phase")?.setAttribute("style", `height:calc(${document.querySelector(".profile_contentextension_item_recordsphase_content")?.clientHeight}px + 20px);background-color:#f5f5f5;`)
        //opacity
        document.querySelector(".profile_contentextension_item_calenderphase_content")?.classList.add("profile_contentextension_switchphase")
        document.querySelector(".profile_contentextension_item_recordsphase_content")?.classList.remove("profile_contentextension_switchphase")
    }, 10);
    setTimeout(() => {
        document.querySelector(".profile_content_extension_carry_content")?.setAttribute("style", `height:auto`)
    }, fast + 10);

}