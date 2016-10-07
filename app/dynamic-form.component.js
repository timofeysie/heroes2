"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var question_control_service_1 = require('./question-control.service');
/**
 * DynamicFormComponent is the entry point and the main container for the form.
 * Create components to represent the dynamic form.
 * presents a list of questions, each question bound to a <df-question> component element.
 * The <df-question> tag matches the DynamicFormQuestionComponent, the component responsible for
 * rendering the details of each individual question based on values in the data-bound question object.
 * modul.Id means Component-Relative Paths are used so we don't need to full path to the template.
 */
var DynamicFormComponent = (function () {
    function DynamicFormComponent(qcs) {
        this.qcs = qcs;
        this.questions = [];
        this.payLoad = '';
    }
    /**
     * (property) DynamicFormComponent.qcs: QuestionControlService
     */
    DynamicFormComponent.prototype.ngOnInit = function () {
        this.form = this.qcs.toFormGroup(this.questions);
    };
    DynamicFormComponent.prototype.onSubmit = function () {
        this.payLoad = JSON.stringify(this.form.value);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DynamicFormComponent.prototype, "questions", void 0);
    DynamicFormComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'dynamic-form',
            templateUrl: 'dynamic-form.component.html',
            providers: [question_control_service_1.QuestionControlService]
        }), 
        __metadata('design:paramtypes', [question_control_service_1.QuestionControlService])
    ], DynamicFormComponent);
    return DynamicFormComponent;
}());
exports.DynamicFormComponent = DynamicFormComponent;
//# sourceMappingURL=dynamic-form.component.js.map