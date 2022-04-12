import { RefObject } from "react"

export function calendarItemChoose(
    back: RefObject<HTMLDivElement>,
    icon: RefObject<HTMLDivElement>,
    content: RefObject<HTMLDivElement>) {

    document.querySelectorAll(".calendar_sidebar_item_back").forEach((element) => {
        element?.classList.remove("calendar_sidebar_item_back_choose")
    })
    document.querySelectorAll(".calendar_sidebar_icon").forEach((element) => {
        element?.classList.remove("calendar_sidebar_icon_choose")
    })
    document.querySelectorAll(".calendar_sidebar_item_content").forEach((element) => {
        element?.classList.remove("calendar_sidebar_item_content_choose")
    })

    back.current?.classList.add("calendar_sidebar_item_back_choose")
    icon.current?.classList.add("calendar_sidebar_icon_choose")
    content.current?.classList.add("calendar_sidebar_item_content_choose")

}
export function backAll(currentStep: number, nextPhase: () => void) {

    //End Phase

    //Push data
    if (currentStep == 0) {
        document.querySelector(".calendar_set_detail")?.classList.remove("calendar_set_detail_toggle")
        document.querySelector(".calendar_patients_info")?.classList.remove("calendar_patients_info_toggle")
        document.querySelectorAll(".calendar_set_item").forEach((element) => {
            element?.classList.remove("calendar_set_item_toggle")
        })
        document.querySelectorAll(".calendar_set_done_item").forEach((element) => {
            element?.classList.remove("calendar_set_done_item_toggle")
        })
        setTimeout(() => {
            document.querySelector(".calendar_setcalendar")?.classList.remove("calendar_setcalendar_toggle")
            document.querySelector(".calendar_thecalendar")?.classList.remove("calendar_thecalendar_toggle")
        }, 600);
    }
    if (currentStep == 1) {
        handleBackStep_0(function () {
            //nothing, leave empty
        })
    }
    if (currentStep == 2) {
        handleBackStep_1(function () {
            //nothing, leave empty
        })
    }

    nextPhase()
}

export function handleSetCalendarStep_0(nextPhase: () => void) {

    //Phase 1

    document.querySelector(".calendar_setcalendar")?.classList.add("calendar_setcalendar_toggle")
    document.querySelector(".calendar_thecalendar")?.classList.add("calendar_thecalendar_toggle")
    document.querySelector(".calendar_patients_info")?.classList.add("calendar_patients_info_toggle")
    setTimeout(() => {
        document.querySelector(".calendar_set_detail")?.classList.add("calendar_set_detail_toggle")
        document.querySelectorAll(".calendar_set_medicine_item").forEach((element, index) => {
            setTimeout(() => {
                element?.classList.add("calendar_set_medicine_item_toggle")
            }, 50 * index);
        })
        document.querySelectorAll(".calendar_set_item").forEach((element, index) => {
            setTimeout(() => {
                element?.classList.add("calendar_set_item_toggle")
            }, 50 * index);
        })
    }, 600);

    nextPhase()

}
export function handleSetCalendarStep_1(nextPhase: () => void) {

    //Phase 2

    setTimeout(() => {
        document.querySelectorAll(".calendar_set_medicine_item").forEach((element) => {
            element?.classList.remove("calendar_set_medicine_item_toggle")
        })
        document.querySelectorAll(".calendar_set_date_item").forEach((element, index) => {
            setTimeout(() => {
                element?.classList.add("calendar_set_date_item_toggle")
            }, 10 * index);
        })
    }, 600);

    nextPhase()
}
export function handleSetCalendarStep_2(nextPhase: () => void) {

    //Phase 3 

    setTimeout(() => {
        document.querySelectorAll(".calendar_set_date_item").forEach((element) => {
            element?.classList.remove("calendar_set_date_item_toggle")
        })
        document.querySelectorAll(".calendar_set_done_item").forEach((element, index) => {
            setTimeout(() => {
                element?.classList.add("calendar_set_done_item_toggle")
            }, 50 * index);
        })
    }, 600);

    nextPhase()
}
export function handleBackStep_0(backPhase: () => void) {
    //

    setTimeout(() => {
        document.querySelectorAll(".calendar_set_medicine_item").forEach((element, index) => {
            setTimeout(() => {
                element?.classList.add("calendar_set_medicine_item_toggle")
            }, 50 * index);
        })
        document.querySelectorAll(".calendar_set_date_item").forEach((element) => {
            element?.classList.remove("calendar_set_date_item_toggle")
        })
        document.querySelectorAll(".calendar_set_done_item").forEach((element) => {
            element?.classList.remove("calendar_set_done_item_toggle")
        })
    }, 600);

    backPhase()

}
export function handleBackStep_1(backPhase: () => void) {

    setTimeout(() => {
        document.querySelectorAll(".calendar_set_date_item").forEach((element, index) => {
            setTimeout(() => {
                element?.classList.add("calendar_set_date_item_toggle")
            }, 10 * index);
        })
        document.querySelectorAll(".calendar_set_done_item").forEach((element) => {
            element?.classList.remove("calendar_set_done_item_toggle")
        })
        document.querySelectorAll(".calendar_set_medicine_item").forEach((element) => {
            element?.classList.remove("calendar_set_medicine_item_toggle")
        })
    }, 600);

    backPhase()
}
export function handleBackStep_2(backPhase: () => void) {

    setTimeout(() => {
        document.querySelectorAll(".calendar_set_date_item").forEach((element) => {
            element?.classList.remove("calendar_set_date_item_toggle")
        })
        document.querySelectorAll(".calendar_set_done_item").forEach((element, index) => {
            setTimeout(() => {
                element?.classList.add("calendar_set_done_item_toggle")
            }, 50 * index);
        })
        document.querySelectorAll(".calendar_set_medicine_item").forEach((element) => {
            element?.classList.remove("calendar_set_medicine_item_toggle")
        })
    }, 600);

    backPhase()
}
export function handleSetCalendarStep_3(nextPhase: () => void) {

    //End Phase

    //Push data

    document.querySelector(".calendar_set_detail")?.classList.remove("calendar_set_detail_toggle")
    document.querySelector(".calendar_patients_info")?.classList.remove("calendar_patients_info_toggle")
    document.querySelectorAll(".calendar_set_item").forEach((element) => {
        element?.classList.remove("calendar_set_item_toggle")
    })
    document.querySelectorAll(".calendar_set_done_item").forEach((element) => {
        element?.classList.remove("calendar_set_done_item_toggle")
    })
    setTimeout(() => {
        document.querySelector(".calendar_setcalendar")?.classList.remove("calendar_setcalendar_toggle")
        document.querySelector(".calendar_thecalendar")?.classList.remove("calendar_thecalendar_toggle")
    }, 600);


    nextPhase()
}
