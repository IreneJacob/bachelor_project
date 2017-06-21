clear all;
clc;


% lusearch

% LOAD NECESSARY .dat FILES
A = load(fullfile('../../../performance-annotations/disl/','dacapoTest/lucene','FieldInfo.dat'));
B = load(fullfile('../../../performance-annotations/disl/','dacapoTest/lucene','fileNameFromGeneration.dat'));

% Correlations
PCC = corrcoef(A(:,1),A(:,2));
PCC(2)

% figure
scatter(A(:,1),A(:,2),100,'MarkerEdgeColor',[.5 0.4 .8],...
              'MarkerFaceColor',[.5 0.4 .8],...
              'MarkerFaceAlpha',0.3,...
              'MarkerEdgeAlpha',0.4,...
              'LineWidth',1.5)
grid on
title('org/apache/lucene/index/FieldInfo.<init>');
legend('Length of string parameter')
set(gca,'fontsize',18)
set(gca,'fontname','Helvetica')
axis([2 10 0 5000])
% 
hold on
% f=fit(A(:,1),A(:,2),'smoothingspline','Exclude', A(:,2) > 2e4 );
% f=fit(A(:,1),A(:,2),'smoothingspline','Exclude', A(:,2) > 7.1e7 );
% plot(f)
xlabel('feature value') % x-axis label
ylabel('execution time (nanoseconds)') % y-axis label
hold off

%% luindex

clear all;
clc;
% LOAD NECESSARY .DAT FILES
A = load(fullfile('../../../performance-annotations/disl/','dacapoTest/lucene','setTermBuffer2.dat'));

% Correlations
PCC = corrcoef(A(:,1),A(:,2));
PCC(2)

% figure
scatter(A(:,1),A(:,2),40,'MarkerEdgeColor',[.5 0.4 .8],...
              'MarkerFaceColor',[.5 0.4 .8],...
              'MarkerFaceAlpha',0.3,...
              'MarkerEdgeAlpha',0.4,...
              'LineWidth',1.5)
grid on
title('org/apache/lucene/analysis/Token.setTermBuffer');
legend('Value of length parameter')
set(gca,'fontsize',18)
% axis([0 20 0 2000])
% 
hold on
% f=fit(A(:,1),A(:,2),'smoothingspline', 'Exclude', A(:,2) > 2e4);
% f=fit(A(:,1),A(:,2),'smoothingspline','Exclude', A(:,2) > 7.1e7 );
% plot(f)
xlabel('feature value') % x-axis label
ylabel('execution time (nanoseconds)') % y-axis label
hold off
%% h2

clear all;
clc;
% LOAD NECESSARY .DAT FILES
A = load(fullfile('../../../performance-annotations/disl/','dacapoTest/h2','parseReferences.dat'));

% Correlations
PCC = corrcoef(A(:,1),A(:,2));
PCC(2)

% figure
scatter(A(:,1),A(:,2),100,'MarkerEdgeColor',[.5 0.4 .8],...
              'MarkerFaceColor',[.5 0.4 .8],...
              'MarkerFaceAlpha',0.3,...
              'MarkerEdgeAlpha',0.4,...
              'LineWidth',1.5)
grid on
title('org/h2/command/Parser.parseReferences');
legend('Length of string prameters')
set(gca,'fontsize',20)
axis([4 10 0 7000])
% 
hold on
f=fit(A(:,1),A(:,2),'poly2', 'Exclude', A(:,2) > 2e4);
% f=fit(A(:,1),A(:,2),'smoothingspline','Exclude', A(:,2) > 7.1e7 );
plot(f)
xlabel('feature value') % x-axis label
ylabel('execution time (nanoseconds)') % y-axis label
hold off
%% sunflow

clear all;
clc;
% LOAD NECESSARY .DAT FILES
A = load(fullfile('../../../performance-annotations/disl/','dacapoTest/sunflow','BuildTask.dat'));

% Correlations
PCC = corrcoef(A(:,1),A(:,2));
PCC(2)

% figure
scatter(A(:,1),A(:,2),100,'MarkerEdgeColor',[.5 0.4 .8],...
              'MarkerFaceColor',[.5 0.4 .8],...
              'MarkerFaceAlpha',0.3,...
              'MarkerEdgeAlpha',0.4,...
              'LineWidth',1.5)
grid on
title('org/sunflow/core/accel/KDTree$BuildTask.<init>');
legend('Integer parameter value')
set(gca,'fontsize',20)
axis([0 700 0 5000])
% 
hold on
f=fit(A(:,1),A(:,2),'poly2', 'Exclude', A(:,2) < 50);
% f=fit(A(:,1),A(:,2),'smoothingspline','Exclude', A(:,2) > 7.1e7 );
plot(f)
xlabel('feature value') % x-axis label
ylabel('execution time (nanoseconds)') % y-axis label
hold off
%% closure
clear all;
clc;
% LOAD NECESSARY .DAT FILES
A = load(fullfile('../../../performance-annotations/disl/','closureTest/logs/NodeTraversal','traverse.dat'));

% Correlations
PCC = corrcoef(A(:,1),A(:,2));
PCC(2)

% figure
scatter(A(:,1),A(:,2),100,'MarkerEdgeColor',[.5 0.4 .8],...
              'MarkerFaceColor',[.5 0.4 .8],...
              'MarkerFaceAlpha',0.3,...
              'MarkerEdgeAlpha',0.4,...
              'LineWidth',1.5)
grid on
% title('com/google/javascript/jscomp/SourceFile.fromCode');
title('com/google/javascript/jscomp/NodeTraversal.traverse');
% legend('child node count','fitted curve')
% legend('Child node count')
set(gca,'fontsize',18)
axis([0 200 0 10e4])
% 
hold on
% options = fitoptions('gauss2', 'Lower', [0 -Inf 0 0 -Inf 0]);
% f=fit(A(:,1),A(:,2),'poly2');
% f=fit(A(:,1),A(:,2),'poly1','Exclude', A(:,2) > 7e4 );
% plot(f)
fplot(@(x) x*10^2 + sqrt(x^4),'r')
legend('child node count','fitted curve')
xlabel('feature value') % x-axis label
ylabel('execution time (nanoseconds)') % y-axis label
hold off